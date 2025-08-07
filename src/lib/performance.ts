import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

// Type declarations for global objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    analytics?: {
      track: (event: string, properties?: any) => void;
    };
    Sentry?: {
      captureMessage: (message: string, options?: any) => void;
    };
  }
}

interface PerformanceMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

// Get performance rating
function getPerformanceRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS];
  if (!thresholds) return 'needs-improvement';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

// Send metrics to analytics
function sendToAnalytics(metric: PerformanceMetric) {
  const rating = getPerformanceRating(metric.name, metric.value);
  
  // Send to Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: rating,
      custom_parameter_1: 'valdo_landing_page'
    });
  }

  // Send to custom analytics
  if (typeof window !== 'undefined' && window.analytics) {
    window.analytics.track('performance_metric', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: rating,
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${metric.name}:`, {
      value: metric.value,
      rating,
      delta: metric.delta
    });
  }

  // Send to error tracking if poor performance
  if (rating === 'poor' && typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureMessage(`Poor performance: ${metric.name}`, {
      level: 'warning',
      tags: {
        metric: metric.name,
        value: metric.value,
        rating
      },
      extra: {
        metric_id: metric.id,
        metric_delta: metric.delta,
        page_url: window.location.href
      }
    });
  }
}

// Initialize performance monitoring
export function initializePerformanceMonitoring() {
  // Core Web Vitals
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  
  // Additional metrics
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);

  // Custom performance monitoring
  if (typeof window !== 'undefined') {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            sendToAnalytics({
              name: 'LONG_TASK',
              value: entry.duration,
              id: entry.entryType,
              delta: entry.duration
            });
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task observer not supported
      }
    }

    // Monitor memory usage
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB threshold
          sendToAnalytics({
            name: 'MEMORY_USAGE',
            value: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
            id: 'memory_usage',
            delta: 0
          });
        }
      }, 30000); // Check every 30 seconds
    }

    // Monitor network requests
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.initiatorType === 'img' || resourceEntry.initiatorType === 'script') {
            if (resourceEntry.duration > 3000) { // Resources taking longer than 3s
              sendToAnalytics({
                name: 'SLOW_RESOURCE',
                value: resourceEntry.duration,
                id: resourceEntry.name,
                delta: resourceEntry.duration
              });
            }
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Resource observer not supported
      }
    }
  }
}

// Track custom performance events
export function trackCustomPerformanceEvent(eventName: string, duration: number, metadata?: Record<string, any>) {
  sendToAnalytics({
    name: eventName,
    value: duration,
    id: eventName,
    delta: duration
  });

  // Additional metadata tracking
  if (metadata && typeof window !== 'undefined' && window.analytics) {
    window.analytics.track('custom_performance_event', {
      event_name: eventName,
      duration,
      ...metadata
    });
  }
}

// Track page load performance
export function trackPageLoadPerformance() {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          sendToAnalytics({
            name: 'PAGE_LOAD_TIME',
            value: navigation.loadEventEnd - navigation.loadEventStart,
            id: 'page_load',
            delta: navigation.loadEventEnd - navigation.loadEventStart
          });
        }
      }, 0);
    });
  }
}

// Track component render performance
export function trackComponentRender(componentName: string, renderTime: number) {
  trackCustomPerformanceEvent(`COMPONENT_RENDER_${componentName.toUpperCase()}`, renderTime, {
    component: componentName,
    page: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
  });
}

// Track image load performance
export function trackImageLoad(imageSrc: string, loadTime: number) {
  trackCustomPerformanceEvent('IMAGE_LOAD_TIME', loadTime, {
    image_src: imageSrc,
    page: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
  });
}

// Performance monitoring hook for React components
export function usePerformanceTracking(componentName: string) {
  const startTime = performance.now();
  
  return {
    trackRender: () => {
      const renderTime = performance.now() - startTime;
      trackComponentRender(componentName, renderTime);
    }
  };
}

// Export performance utilities
export {
  onCLS,
  onINP,
  onLCP,
  onFCP,
  onTTFB
}; 

// Performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private preloadedImages: Set<string> = new Set();
  private intersectionObserver: IntersectionObserver | null = null;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Preload critical images
  preloadCriticalImages(imageUrls: string[]): void {
    if (typeof window === 'undefined') return;

    imageUrls.forEach(url => {
      if (!this.preloadedImages.has(url)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
        this.preloadedImages.add(url);
      }
    });
  }

  // Lazy load images with intersection observer
  setupLazyLoading(): void {
    if (typeof window === 'undefined') return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              this.intersectionObserver?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01
      }
    );

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      this.intersectionObserver?.observe(img);
    });
  }

  // Optimize image loading with priority
  optimizeImageLoading(images: Array<{ src: string; priority?: boolean }>): void {
    if (typeof window === 'undefined') return;

    images.forEach(({ src, priority }) => {
      if (priority) {
        this.preloadCriticalImages([src]);
      }
    });
  }

  // Monitor Core Web Vitals
  monitorCoreWebVitals(): void {
    if (typeof window === 'undefined') return;

    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      
      // Send to analytics if needed
      if (window.gtag) {
        window.gtag('event', 'LCP', {
          value: Math.round(lastEntry.startTime),
          event_category: 'Web Vitals'
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
        
        if (window.gtag) {
          window.gtag('event', 'FID', {
            value: Math.round(entry.processingStart - entry.startTime),
            event_category: 'Web Vitals'
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      console.log('CLS:', clsValue);
      
      if (window.gtag) {
        window.gtag('event', 'CLS', {
          value: Math.round(clsValue * 1000) / 1000,
          event_category: 'Web Vitals'
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Optimize font loading
  optimizeFontLoading(): void {
    if (typeof window === 'undefined') return;

    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-var.woff'
    ];

    criticalFonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = font;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Cleanup
  cleanup(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }
}

// Image optimization utilities
export const imageOptimizer = {
  // Generate responsive image sizes
  getResponsiveSizes(containerWidth: number): string {
    return `(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, ${Math.min(containerWidth, 1200)}px`;
  },

  // Get optimal image format
  getOptimalFormat(): string {
    if (typeof window === 'undefined') return 'webp';
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    if (canvas.toDataURL('image/avif').length > 0) return 'avif';
    if (canvas.toDataURL('image/webp').length > 0) return 'webp';
    return 'jpeg';
  },

  // Calculate optimal image quality
  getOptimalQuality(width: number, height: number): number {
    const totalPixels = width * height;
    if (totalPixels > 2000000) return 75; // Large images
    if (totalPixels > 500000) return 80;  // Medium images
    return 85; // Small images
  }
};

// Performance monitoring
export const performanceMonitor = {
  // Track page load time
  trackPageLoad(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log('Page load time:', loadTime);
      
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          value: Math.round(loadTime),
          event_category: 'Performance'
        });
      }
    });
  },

  // Track image load performance
  trackImageLoad(img: HTMLImageElement): void {
    const startTime = performance.now();
    
    img.addEventListener('load', () => {
      const loadTime = performance.now() - startTime;
      console.log('Image load time:', loadTime, img.src);
      
      if (window.gtag) {
        window.gtag('event', 'image_load_time', {
          value: Math.round(loadTime),
          event_category: 'Performance',
          event_label: img.src
        });
      }
    });
  },

  // Track user interactions
  trackUserInteractions(): void {
    if (typeof window === 'undefined') return;

    let firstInteraction = true;
    
    const trackInteraction = () => {
      if (firstInteraction) {
        const timeToFirstInteraction = performance.now();
        console.log('Time to first interaction:', timeToFirstInteraction);
        
        if (window.gtag) {
          window.gtag('event', 'first_interaction', {
            value: Math.round(timeToFirstInteraction),
            event_category: 'User Experience'
          });
        }
        
        firstInteraction = false;
        document.removeEventListener('click', trackInteraction);
        document.removeEventListener('scroll', trackInteraction);
      }
    };

    document.addEventListener('click', trackInteraction);
    document.addEventListener('scroll', trackInteraction);
  }
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = (): void => {
  const optimizer = PerformanceOptimizer.getInstance();
  
  // Preload critical images
  const criticalImages = [
    '/images/Vineyards/Copia di colline.jpg',
    '/images/Logos/Valdo Logo New.png',
    '/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png'
  ];
  
  optimizer.preloadCriticalImages(criticalImages);
  optimizer.setupLazyLoading();
  optimizer.optimizeFontLoading();
  optimizer.monitorCoreWebVitals();
  
  performanceMonitor.trackPageLoad();
  performanceMonitor.trackUserInteractions();
};

// Cleanup on unmount
export const cleanupPerformanceOptimizations = (): void => {
  const optimizer = PerformanceOptimizer.getInstance();
  optimizer.cleanup();
}; 
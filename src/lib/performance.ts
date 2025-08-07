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
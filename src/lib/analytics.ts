import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import * as Sentry from '@sentry/nextjs';
import { GoogleAnalytics } from '@next/third-parties/google';
import mixpanel from 'mixpanel-browser';

// Initialize tracking
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);
}

// Initialize Sentry for error tracking
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }
    
    // Mixpanel for detailed user journey
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      mixpanel.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        url: window.location.href,
      });
    }
    
    // Custom wine-specific events
    if (eventName.includes('wine_')) {
      mixpanel.people.increment('wines_viewed');
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
    Sentry.captureException(error);
  }
}

// Heatmap tracking for bottle interactions
export function trackBottleInteraction(wineName: string, action: string) {
  trackEvent('wine_interaction', {
    wine_name: wineName,
    action_type: action,
    timestamp: new Date().toISOString(),
    viewport_size: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown',
    page_url: typeof window !== 'undefined' ? window.location.href : 'unknown',
  });
}

// Vineyard tour tracking
export function trackVineyardTour(point: string, action: string) {
  trackEvent('vineyard_tour_interaction', {
    tour_point: point,
    action_type: action,
    timestamp: new Date().toISOString(),
  });
}

// Pairing wheel tracking
export function trackPairingInteraction(wineType: string, category: string) {
  trackEvent('pairing_interaction', {
    wine_type: wineType,
    category: category,
    timestamp: new Date().toISOString(),
  });
}

// Language switching tracking
export function trackLanguageSwitch(fromLang: string, toLang: string) {
  trackEvent('language_switch', {
    from_language: fromLang,
    to_language: toLang,
    timestamp: new Date().toISOString(),
  });
}

// Purchase intent tracking
export function trackPurchaseIntent(wineName: string, price: string, source: string) {
  trackEvent('purchase_intent', {
    wine_name: wineName,
    price: price,
    source: source,
    timestamp: new Date().toISOString(),
  });
}

// Newsletter signup tracking
export function trackNewsletterSignup(email: string, source: string) {
  trackEvent('newsletter_signup', {
    email_domain: email.split('@')[1],
    source: source,
    timestamp: new Date().toISOString(),
  });
}

// Contact form tracking
export function trackContactForm(action: string, formType: string) {
  trackEvent('contact_form', {
    action: action,
    form_type: formType,
    timestamp: new Date().toISOString(),
  });
}

// Page view tracking with enhanced data
export function trackPageView(pageName: string, customProperties?: Record<string, any>) {
  trackEvent('page_view', {
    page_name: pageName,
    page_url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    referrer: typeof window !== 'undefined' ? document.referrer : 'unknown',
    ...customProperties,
  });
}

// User identification for Mixpanel
export function identifyUser(userId: string, userProperties?: Record<string, any>) {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    mixpanel.identify(userId);
    if (userProperties) {
      mixpanel.people.set(userProperties);
    }
  }
}

// Set user properties
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    mixpanel.people.set(properties);
  }
}

// Track user journey steps
export function trackUserJourney(step: string, stepNumber: number, totalSteps: number) {
  trackEvent('user_journey_step', {
    step: step,
    step_number: stepNumber,
    total_steps: totalSteps,
    progress_percentage: Math.round((stepNumber / totalSteps) * 100),
    timestamp: new Date().toISOString(),
  });
}

// Performance tracking
export function trackPerformance(metric: string, value: number, unit: string = 'ms') {
  trackEvent('performance_metric', {
    metric: metric,
    value: value,
    unit: unit,
    timestamp: new Date().toISOString(),
  });
}

// Error tracking wrapper
export function trackError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
  
  trackEvent('error_occurred', {
    error_message: error.message,
    error_stack: error.stack,
    context: context,
    timestamp: new Date().toISOString(),
  });
}

// Export analytics components for use in layout
export { Analytics, SpeedInsights, GoogleAnalytics }; 
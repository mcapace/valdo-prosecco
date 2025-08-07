import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  trackEvent, 
  trackPageView, 
  trackBottleInteraction, 
  trackVineyardTour, 
  trackPairingInteraction,
  trackLanguageSwitch,
  trackPurchaseIntent,
  trackNewsletterSignup,
  trackContactForm,
  trackUserJourney,
  trackPerformance,
  trackError
} from '@/lib/analytics';

export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views automatically
  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, {
        search_params: searchParams.toString(),
        timestamp: new Date().toISOString(),
      });
    }
  }, [pathname, searchParams]);

  // Track performance metrics
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            trackPerformance('page_load_time', navEntry.loadEventEnd - navEntry.loadEventStart);
            trackPerformance('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart);
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      
      return () => observer.disconnect();
    }
  }, []);

  // Track user interactions
  const trackWineInteraction = useCallback((wineName: string, action: string) => {
    trackBottleInteraction(wineName, action);
  }, []);

  const trackTourInteraction = useCallback((point: string, action: string) => {
    trackVineyardTour(point, action);
  }, []);

  const trackPairing = useCallback((wineType: string, category: string) => {
    trackPairingInteraction(wineType, category);
  }, []);

  const trackLanguageChange = useCallback((fromLang: string, toLang: string) => {
    trackLanguageSwitch(fromLang, toLang);
  }, []);

  const trackPurchase = useCallback((wineName: string, price: string, source: string) => {
    trackPurchaseIntent(wineName, price, source);
  }, []);

  const trackNewsletter = useCallback((email: string, source: string) => {
    trackNewsletterSignup(email, source);
  }, []);

  const trackContact = useCallback((action: string, formType: string) => {
    trackContactForm(action, formType);
  }, []);

  const trackJourney = useCallback((step: string, stepNumber: number, totalSteps: number) => {
    trackUserJourney(step, stepNumber, totalSteps);
  }, []);

  const trackErrorEvent = useCallback((error: Error, context?: Record<string, any>) => {
    trackError(error, context);
  }, []);

  const trackCustomEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackEvent(eventName, properties);
  }, []);

  return {
    trackWineInteraction,
    trackTourInteraction,
    trackPairing,
    trackLanguageChange,
    trackPurchase,
    trackNewsletter,
    trackContact,
    trackJourney,
    trackError: trackErrorEvent,
    trackEvent: trackCustomEvent,
  };
} 
import { useEffect, useState } from 'react';
import { useAnalytics } from './useAnalytics';

interface MiddlewareData {
  country: string;
  city: string;
  region: string;
  preferredLocale: string;
  abTestBucket: string;
  clientIP: string;
}

export function useMiddleware() {
  const [middlewareData, setMiddlewareData] = useState<MiddlewareData | null>(null);
  const [loading, setLoading] = useState(true);
  const analytics = useAnalytics();

  useEffect(() => {
    // Get middleware data from headers (if available)
    const getMiddlewareData = async () => {
      try {
        // In a real implementation, you might fetch this from an API endpoint
        // For now, we'll simulate the data
        const data: MiddlewareData = {
          country: 'US', // Default fallback
          city: 'Unknown',
          region: 'Unknown',
          preferredLocale: 'en',
          abTestBucket: 'a',
          clientIP: 'unknown',
        };

        // Track geolocation data
        analytics.trackEvent('geolocation_detected', {
          country: data.country,
          city: data.city,
          region: data.region,
          preferred_locale: data.preferredLocale,
        });

        // Track A/B test assignment
        analytics.trackEvent('ab_test_assigned', {
          bucket: data.abTestBucket,
          test_name: 'landing_page_variant',
        });

        setMiddlewareData(data);
      } catch (error) {
        console.error('Error fetching middleware data:', error);
      } finally {
        setLoading(false);
      }
    };

    getMiddlewareData();
  }, [analytics]);

  // Get country-specific content
  const getCountryContent = (contentMap: Record<string, any>) => {
    if (!middlewareData) return contentMap.default || contentMap.US;
    return contentMap[middlewareData.country] || contentMap.default || contentMap.US;
  };

  // Get A/B test variant
  const getABTestVariant = (testName: string) => {
    if (!middlewareData) return 'a';
    return middlewareData.abTestBucket;
  };

  // Check if user is in specific country
  const isInCountry = (countryCode: string) => {
    if (!middlewareData) return false;
    return middlewareData.country === countryCode;
  };

  // Get localized content based on geolocation
  const getLocalizedContent = (contentMap: Record<string, any>) => {
    if (!middlewareData) return contentMap.en;
    return contentMap[middlewareData.preferredLocale] || contentMap.en;
  };

  return {
    middlewareData,
    loading,
    getCountryContent,
    getABTestVariant,
    isInCountry,
    getLocalizedContent,
  };
} 
import { motion } from 'framer-motion';
import { useMiddleware } from '@/hooks/useMiddleware';
import { useAnalytics } from '@/hooks/useAnalytics';

export function MiddlewareDemo() {
  const { middlewareData, loading, getCountryContent, getABTestVariant, isInCountry } = useMiddleware();
  const analytics = useAnalytics();

  // Country-specific content examples
  const countryContent = {
    US: {
      currency: 'USD',
      shipping: 'Free shipping on orders over $50',
      phone: '+1 (555) 123-4567',
      address: '123 Wine Street, Napa Valley, CA 94558',
    },
    IT: {
      currency: 'EUR',
      shipping: 'Spedizione gratuita per ordini superiori a €40',
      phone: '+39 0423 123456',
      address: 'Via del Vino 123, Valdobbiadene, TV 31049',
    },
    GB: {
      currency: 'GBP',
      shipping: 'Free shipping on orders over £40',
      phone: '+44 20 1234 5678',
      address: '123 Wine Lane, London, UK SW1A 1AA',
    },
    default: {
      currency: 'USD',
      shipping: 'Free shipping on orders over $50',
      phone: '+1 (555) 123-4567',
      address: '123 Wine Street, Napa Valley, CA 94558',
    },
  };

  // A/B test content variants
  const abTestContent = {
    a: {
      heroTitle: 'Discover Premium Italian Prosecco',
      heroSubtitle: 'Crafted with tradition since 1926',
      ctaText: 'Shop Now',
      ctaStyle: 'bg-gold text-white',
    },
    b: {
      heroTitle: 'Experience Valdo Prosecco Excellence',
      heroSubtitle: 'Over 90 years of winemaking heritage',
      ctaText: 'Explore Collection',
      ctaStyle: 'bg-blue-600 text-white',
    },
  };

  const handleABTestInteraction = (variant: string, element: string) => {
    analytics.trackEvent('ab_test_interaction', {
      variant,
      element,
      test_name: 'landing_page_variant',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
    );
  }

  const currentVariant = getABTestVariant('landing_page_variant');
  const variantContent = abTestContent[currentVariant as keyof typeof abTestContent];
  const userCountryContent = getCountryContent(countryContent);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Middleware Functionality Demo
        </h2>
        <p className="text-gray-600">
          This demo shows how middleware provides geolocation data and A/B testing capabilities.
        </p>
      </motion.div>

      {/* Geolocation Data */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Geolocation Data</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">User Location</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Country:</span>
                <span className="font-semibold">{middlewareData?.country || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">City:</span>
                <span className="font-semibold">{middlewareData?.city || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Region:</span>
                <span className="font-semibold">{middlewareData?.region || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Preferred Locale:</span>
                <span className="font-semibold">{middlewareData?.preferredLocale || 'en'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Country-Specific Content</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Currency:</span>
                <span className="font-semibold">{userCountryContent.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-xs">{userCountryContent.shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold text-xs">{userCountryContent.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Country-specific features */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-3">Country-Specific Features</h4>
          <div className="flex flex-wrap gap-2">
            {isInCountry('IT') && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                🇮🇹 Italian Content Available
              </span>
            )}
            {isInCountry('US') && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                🇺🇸 US Shipping Available
              </span>
            )}
            {isInCountry('GB') && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                🇬🇧 UK VAT Included
              </span>
            )}
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                🌍 International Shipping
              </span>
          </div>
        </div>
      </motion.section>

      {/* A/B Testing Demo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">A/B Testing Demo</h3>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Current Variant:</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              currentVariant === 'a' ? 'bg-gold text-white' : 'bg-blue-600 text-white'
            }`}>
              Variant {currentVariant.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Hero Section Demo */}
        <div className="bg-gradient-to-r from-gold/10 to-amber-50 p-6 rounded-lg">
          <div className="text-center">
            <h2 
              className="text-2xl font-bold text-gray-900 mb-2"
              onClick={() => handleABTestInteraction(currentVariant, 'hero_title')}
            >
              {variantContent.heroTitle}
            </h2>
            <p className="text-gray-600 mb-4">
              {variantContent.heroSubtitle}
            </p>
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${variantContent.ctaStyle}`}
              onClick={() => handleABTestInteraction(currentVariant, 'cta_button')}
            >
              {variantContent.ctaText}
            </button>
          </div>
        </div>

        {/* A/B Test Comparison */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">Variant A</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Title:</strong> {abTestContent.a.heroTitle}</div>
              <div><strong>CTA:</strong> {abTestContent.a.ctaText}</div>
              <div><strong>Style:</strong> Gold theme</div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium mb-2">Variant B</h4>
            <div className="space-y-2 text-sm">
              <div><strong>Title:</strong> {abTestContent.b.heroTitle}</div>
              <div><strong>CTA:</strong> {abTestContent.b.ctaText}</div>
              <div><strong>Style:</strong> Blue theme</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Technical Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-50 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Technical Information</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Middleware Headers</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• x-country: {middlewareData?.country || 'Unknown'}</li>
              <li>• x-city: {middlewareData?.city || 'Unknown'}</li>
              <li>• x-region: {middlewareData?.region || 'Unknown'}</li>
              <li>• x-preferred-locale: {middlewareData?.preferredLocale || 'en'}</li>
              <li>• x-client-ip: {middlewareData?.clientIP || 'Unknown'}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Cookies Set</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• ab-test-bucket: {middlewareData?.abTestBucket || 'a'}</li>
              <li>• age-verified: true (if verified)</li>
              <li>• locale: {middlewareData?.preferredLocale || 'en'}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-2">Features</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              Age Verification
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              Geolocation
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              A/B Testing
            </span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
              Security Headers
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
              Cache Control
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

export function AnalyticsDemo() {
  const [selectedWine, setSelectedWine] = useState<string>('');
  const [tourStep, setTourStep] = useState(1);
  const analytics = useAnalytics();

  const wines = [
    { name: 'Valdo Prosecco DOCG', price: '€18.99', type: 'prosecco' },
    { name: 'Valdo Rosé', price: '€22.99', type: 'rose' },
    { name: 'Valdo Brut', price: '€25.99', type: 'brut' },
  ];

  const tourPoints = [
    'Glera Vines',
    'Harvest Process',
    'Fermentation',
    'Bottling',
    'Quality Control',
    'Final Product',
  ];

  const handleWineInteraction = (wine: typeof wines[0], action: string) => {
    analytics.trackWineInteraction(wine.name, action);
    setSelectedWine(wine.name);
  };

  const handleTourPoint = (point: string, index: number) => {
    analytics.trackTourInteraction(point, 'click');
    analytics.trackJourney(`tour_${point.toLowerCase().replace(' ', '_')}`, index + 1, tourPoints.length);
    setTourStep(index + 1);
  };

  const handlePurchase = (wine: typeof wines[0]) => {
    analytics.trackPurchase(wine.name, wine.price, 'demo_component');
  };

  const handleLanguageSwitch = () => {
    analytics.trackLanguageChange('en', 'it');
  };

  const handleNewsletterSignup = () => {
    analytics.trackNewsletter('demo@example.com', 'analytics_demo');
  };

  const handleContactForm = () => {
    analytics.trackContact('submit', 'demo_form');
  };

  const handlePairingSelection = (wineType: string, category: string) => {
    analytics.trackPairing(wineType, category);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Analytics Tracking Demo
        </h2>
        <p className="text-gray-600">
          This demo shows how analytics events are tracked throughout the user journey.
        </p>
      </motion.div>

      {/* Wine Interaction Demo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Wine Interactions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {wines.map((wine, index) => (
            <motion.div
              key={wine.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleWineInteraction(wine, 'view')}
            >
              <h4 className="font-semibold text-gold">{wine.name}</h4>
              <p className="text-gray-600 mb-2">{wine.price}</p>
              <div className="space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWineInteraction(wine, 'rotate');
                  }}
                  className="w-full bg-blue-500 text-white py-1 px-3 rounded text-sm"
                >
                  Rotate 360°
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase(wine);
                  }}
                  className="w-full bg-gold text-white py-1 px-3 rounded text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {selectedWine && (
          <p className="mt-4 text-sm text-gray-600">
            Last interacted with: <span className="font-semibold">{selectedWine}</span>
          </p>
        )}
      </motion.section>

      {/* Vineyard Tour Demo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Vineyard Tour Journey</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">Step {tourStep} of {tourPoints.length}</span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gold h-2 rounded-full transition-all duration-300"
              style={{ width: `${(tourStep / tourPoints.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {tourPoints.map((point, index) => (
            <button
              key={point}
              onClick={() => handleTourPoint(point, index)}
              className={`p-3 rounded-lg border transition-colors ${
                index < tourStep
                  ? 'bg-gold text-white border-gold'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {point}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Pairing Wheel Demo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Wine Pairing Selections</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Wine Types</h4>
            <div className="space-y-2">
              {['Prosecco', 'Rosé', 'Brut'].map((type) => (
                <button
                  key={type}
                  onClick={() => handlePairingSelection(type, 'wine_type')}
                  className="w-full text-left p-2 rounded hover:bg-gray-50"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Food Categories</h4>
            <div className="space-y-2">
              {['Seafood', 'Pasta', 'Cheese', 'Dessert'].map((category) => (
                <button
                  key={category}
                  onClick={() => handlePairingSelection('Prosecco', category)}
                  className="w-full text-left p-2 rounded hover:bg-gray-50"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* User Actions Demo */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">User Actions</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <button
              onClick={handleLanguageSwitch}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Switch Language (EN → IT)
            </button>
            <button
              onClick={handleNewsletterSignup}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Newsletter Signup
            </button>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleContactForm}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Contact Form Submit
            </button>
            <button
              onClick={() => analytics.trackEvent('custom_event', { demo: true })}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >
              Custom Event
            </button>
          </div>
        </div>
      </motion.section>

      {/* Analytics Info */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Analytics Information</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Tracked Events:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Wine interactions (view, rotate, purchase)</li>
              <li>• Vineyard tour progression</li>
              <li>• Pairing selections</li>
              <li>• Language switches</li>
              <li>• Form submissions</li>
              <li>• Page views and performance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Analytics Services:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Vercel Analytics</li>
              <li>• Google Analytics 4</li>
              <li>• Mixpanel</li>
              <li>• Sentry Error Tracking</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Check your browser's developer console to see analytics events being logged in development mode.
        </p>
      </motion.section>
    </div>
  );
} 
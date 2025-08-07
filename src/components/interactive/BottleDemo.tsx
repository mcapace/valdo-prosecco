import { useState } from 'react';
import { Bottle360, preloadBottleModel } from './Bottle360';
import { motion } from 'framer-motion';

// Sample bottle model URLs (you'll need to replace these with actual model URLs)
const BOTTLE_MODELS = {
  prosecco: '/models/valdo-prosecco-bottle.glb',
  rose: '/models/valdo-rose-bottle.glb',
  brut: '/models/valdo-brut-bottle.glb',
};

// Preload models for better performance
Object.values(BOTTLE_MODELS).forEach(preloadBottleModel);

interface BottleDemoProps {
  className?: string;
}

export function BottleDemo({ className = '' }: BottleDemoProps) {
  const [selectedBottle, setSelectedBottle] = useState<keyof typeof BOTTLE_MODELS>('prosecco');
  const [autoRotate, setAutoRotate] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const bottleInfo = {
    prosecco: {
      name: 'Valdo Prosecco',
      description: 'Premium Italian sparkling wine with delicate bubbles',
      price: '$24.99',
      color: 'bg-yellow-50 border-yellow-200'
    },
    rose: {
      name: 'Valdo Rosé',
      description: 'Elegant rosé with notes of red berries',
      price: '$28.99',
      color: 'bg-pink-50 border-pink-200'
    },
    brut: {
      name: 'Valdo Brut',
      description: 'Dry and crisp with citrus undertones',
      price: '$26.99',
      color: 'bg-blue-50 border-blue-200'
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Explore Our Premium Collection
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the craftsmanship of Valdo Prosecco through our interactive 3D bottle viewer
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 3D Viewer */}
        <div className="lg:col-span-2">
          <Bottle360
            modelUrl={BOTTLE_MODELS[selectedBottle]}
            autoRotate={autoRotate}
            showControls={showControls}
            className="rounded-2xl overflow-hidden shadow-2xl"
          />
        </div>

        {/* Controls and Info */}
        <div className="space-y-6">
          {/* Bottle Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900">Select Bottle</h3>
            <div className="space-y-3">
              {Object.entries(BOTTLE_MODELS).map(([key, url]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedBottle(key as keyof typeof BOTTLE_MODELS)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedBottle === key 
                      ? 'border-gold bg-gold/10 shadow-lg' 
                      : 'border-gray-200 hover:border-gold/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">
                      {bottleInfo[key as keyof typeof BOTTLE_MODELS].name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {bottleInfo[key as keyof typeof BOTTLE_MODELS].description}
                    </p>
                    <p className="text-lg font-bold text-gold mt-2">
                      {bottleInfo[key as keyof typeof BOTTLE_MODELS].price}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Viewer Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900">Viewer Controls</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRotate}
                  onChange={(e) => setAutoRotate(e.target.checked)}
                  className="w-4 h-4 text-gold rounded focus:ring-gold"
                />
                <span className="text-gray-700">Auto-rotate</span>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showControls}
                  onChange={(e) => setShowControls(e.target.checked)}
                  className="w-4 h-4 text-gold rounded focus:ring-gold"
                />
                <span className="text-gray-700">Show controls</span>
              </label>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={`p-6 rounded-lg border-2 ${bottleInfo[selectedBottle].color}`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {bottleInfo[selectedBottle].name}
            </h3>
            <p className="text-gray-700 mb-4">
              {bottleInfo[selectedBottle].description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gold">
                {bottleInfo[selectedBottle].price}
              </span>
              <motion.button
                className="px-6 py-2 bg-gold text-white rounded-lg font-semibold hover:bg-gold/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 
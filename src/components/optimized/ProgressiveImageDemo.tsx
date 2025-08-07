import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressiveImage } from './ProgressiveImage';
import { ProgressiveImageAdvanced } from './ProgressiveImageAdvanced';

// Sample images for demo
const DEMO_IMAGES = [
  {
    id: 'vineyard',
    src: '/images/vineyard-sunset.jpg',
    alt: 'Valdobbiadene Vineyard at Sunset',
    title: 'Vineyard Sunset',
    description: 'Golden hour over our Glera grape vines'
  },
  {
    id: 'bottles',
    src: '/images/prosecco-bottles.jpg',
    alt: 'Valdo Prosecco Bottles',
    title: 'Premium Collection',
    description: 'Our finest Prosecco varieties'
  },
  {
    id: 'harvest',
    src: '/images/grape-harvest.jpg',
    alt: 'Grape Harvesting',
    title: 'Harvest Season',
    description: 'Traditional hand-harvesting methods'
  },
  {
    id: 'winery',
    src: '/images/historic-winery.jpg',
    alt: 'Historic Valdo Winery',
    title: 'Our Heritage',
    description: 'Century-old winery in Valdobbiadene'
  }
];

interface ProgressiveImageDemoProps {
  className?: string;
}

export function ProgressiveImageDemo({ className = '' }: ProgressiveImageDemoProps) {
  const [selectedPlaceholder, setSelectedPlaceholder] = useState<'blur' | 'shimmer' | 'color'>('blur');
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Optimized Image Loading
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience lightning-fast image loading with our progressive image components. 
          See the difference between different placeholder types and loading strategies.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Basic Progressive Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-900">Basic Progressive Image</h3>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <ProgressiveImage
              src={DEMO_IMAGES[selectedImage].src}
              alt={DEMO_IMAGES[selectedImage].alt}
              className="w-full h-full"
              priority={selectedImage === 0}
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-gray-900">{DEMO_IMAGES[selectedImage].title}</h4>
            <p className="text-sm text-gray-600">{DEMO_IMAGES[selectedImage].description}</p>
          </div>
        </motion.div>

        {/* Advanced Progressive Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-900">Advanced Progressive Image</h3>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <ProgressiveImageAdvanced
              src={DEMO_IMAGES[selectedImage].src}
              alt={DEMO_IMAGES[selectedImage].alt}
              className="w-full h-full"
              placeholder={selectedPlaceholder}
              placeholderColor="#D4AF37"
              priority={selectedImage === 0}
              onLoad={() => console.log('Image loaded successfully')}
              onError={() => console.log('Image failed to load')}
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-gray-900">{DEMO_IMAGES[selectedImage].title}</h4>
            <p className="text-sm text-gray-600">{DEMO_IMAGES[selectedImage].description}</p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-8"
      >
        {/* Image Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Image</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DEMO_IMAGES.map((image, index) => (
              <motion.button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedImage === index 
                    ? 'border-gold bg-gold/10 shadow-lg' 
                    : 'border-gray-200 hover:border-gold/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-square rounded overflow-hidden mb-2">
                  <ProgressiveImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm font-medium text-gray-900">{image.title}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Placeholder Type Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Placeholder Type</h3>
          <div className="flex flex-wrap gap-4">
            {(['blur', 'shimmer', 'color'] as const).map((type) => (
              <motion.button
                key={type}
                onClick={() => setSelectedPlaceholder(type)}
                className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 capitalize ${
                  selectedPlaceholder === type 
                    ? 'border-gold bg-gold text-black font-semibold' 
                    : 'border-gray-200 hover:border-gold/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Features Comparison</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Basic ProgressiveImage</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Blur placeholder</li>
                <li>• Smooth fade-in transition</li>
                <li>• Priority loading support</li>
                <li>• Simple implementation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Advanced ProgressiveImage</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Multiple placeholder types</li>
                <li>• Loading indicators</li>
                <li>• Error handling</li>
                <li>• Custom aspect ratios</li>
                <li>• Event callbacks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="bg-gradient-to-r from-gold/10 to-yellow-100 p-6 rounded-xl border border-gold/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Tips</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold text-gold">Use Priority:</span>
              <p>Set priority=true for above-the-fold images</p>
            </div>
            <div>
              <span className="font-semibold text-gold">Optimize Sizes:</span>
              <p>Use appropriate sizes prop for responsive images</p>
            </div>
            <div>
              <span className="font-semibold text-gold">Choose Placeholders:</span>
              <p>Blur for photos, shimmer for UI, color for branding</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 
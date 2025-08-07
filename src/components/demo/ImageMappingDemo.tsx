import { useState } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage, HeroImage, LogoImage, WineBottleImage } from '../common/OptimizedImage';
import { ImageGallery, WineBottleGallery, VineyardGallery, CasaValdoGallery, LifestyleGallery } from '../common/ImageGallery';
import { 
  getAvailableSections, 
  getSectionKeys, 
  getImageConfig,
  IMAGE_MAPPING 
} from '@/lib/imageMapping';

export function ImageMappingDemo() {
  const [selectedSection, setSelectedSection] = useState('hero');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sections = getAvailableSections();
  const sectionKeys = getSectionKeys(selectedSection);

  const handleImageClick = (key: string) => {
    setSelectedImage(key);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Image Mapping System Demo
        </h2>
        <p className="text-gray-600">
          This demo showcases the comprehensive image mapping system with optimized loading and gallery functionality.
        </p>
      </motion.div>

      {/* Section Selector */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Image Sections</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`p-3 rounded-lg border transition-colors ${
                selectedSection === section
                  ? 'bg-gold text-white border-gold'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="text-sm font-medium capitalize">
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-xs opacity-75">
                {getSectionKeys(section).length} images
              </div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* Individual Image Display */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">
          Individual Images - {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectionKeys.map((key) => {
            const config = getImageConfig(selectedSection, key);
            if (!config) return null;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative">
                  <OptimizedImage
                    section={selectedSection}
                    key={key}
                    className="w-full h-full"
                    fill={true}
                    showLoading={true}
                    showError={true}
                    onClick={() => handleImageClick(key)}
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {config.width} × {config.height}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {config.alt}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Specialized Components */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-4">Specialized Components</h3>
        
        <div className="space-y-6">
          {/* Hero Section */}
          <div>
            <h4 className="font-medium mb-3">Hero Background</h4>
            <div className="h-48 relative rounded-lg overflow-hidden">
              <HeroImage className="w-full h-full" />
            </div>
          </div>

          {/* Logo */}
          <div>
            <h4 className="font-medium mb-3">Logo Variants</h4>
            <div className="flex gap-4 items-center">
              <LogoImage variant="white" className="h-12" />
              <LogoImage variant="dark" className="h-12" />
            </div>
          </div>

          {/* Wine Bottles */}
          <div>
            <h4 className="font-medium mb-3">Wine Bottles</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['marcaOro', 'numero10', 'superiore', 'marcaOroRose'].map((wine) => (
                <div key={wine} className="h-64">
                  <WineBottleImage wine={wine} className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Gallery Components */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h3 className="text-xl font-semibold mb-6">Gallery Components</h3>
        
        <div className="space-y-8">
          {/* Wine Bottle Gallery */}
          <div>
            <h4 className="font-medium mb-3">Wine Bottle Gallery</h4>
            <WineBottleGallery maxImages={4} />
          </div>

          {/* Vineyard Gallery */}
          <div>
            <h4 className="font-medium mb-3">Vineyard Gallery</h4>
            <VineyardGallery maxImages={3} />
          </div>

          {/* Casa Valdo Gallery */}
          <div>
            <h4 className="font-medium mb-3">Casa Valdo Gallery</h4>
            <CasaValdoGallery maxImages={3} />
          </div>

          {/* Lifestyle Gallery */}
          <div>
            <h4 className="font-medium mb-3">Lifestyle Gallery</h4>
            <LifestyleGallery maxImages={4} />
          </div>
        </div>
      </motion.section>

      {/* Image Configuration Info */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-6 rounded-lg"
      >
        <h3 className="text-xl font-semibold mb-4">Image Configuration</h3>
        
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-2">Available Sections</h4>
            <ul className="space-y-1 text-gray-600">
              {sections.map((section) => (
                <li key={section} className="flex justify-between">
                  <span className="capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-gray-400">{getSectionKeys(section).length} images</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Features</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Next.js Image optimization</li>
              <li>• Automatic responsive sizing</li>
              <li>• Lazy loading with blur placeholders</li>
              <li>• Error handling with fallbacks</li>
              <li>• Lightbox gallery functionality</li>
              <li>• Type-safe image configuration</li>
              <li>• Specialized components for common use cases</li>
            </ul>
          </div>
        </div>

        {/* Selected Image Details */}
        {selectedImage && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-2">Selected Image Details</h4>
            <div className="bg-white p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Section:</strong> {selectedSection}
                </div>
                <div>
                  <strong>Key:</strong> {selectedImage}
                </div>
                <div>
                  <strong>Path:</strong> {getImageConfig(selectedSection, selectedImage)?.path}
                </div>
                <div>
                  <strong>Dimensions:</strong> {getImageConfig(selectedSection, selectedImage)?.width} × {getImageConfig(selectedSection, selectedImage)?.height}
                </div>
                <div className="md:col-span-2">
                  <strong>Alt Text:</strong> {getImageConfig(selectedSection, selectedImage)?.alt}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
} 
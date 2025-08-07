import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';
import { getSectionImages, ImageSection } from '@/lib/imageMapping';

interface ImageGalleryProps {
  section: string;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  aspectRatio?: number;
  showLightbox?: boolean;
  maxImages?: number;
  filter?: (key: string) => boolean;
}

export function ImageGallery({
  section,
  className = '',
  columns = 3,
  aspectRatio,
  showLightbox = true,
  maxImages,
  filter,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Get all images from the section
  const sectionImages = getSectionImages(section);
  
  if (!sectionImages) {
    console.warn(`Image section "${section}" not found`);
    return null;
  }

  // Filter and limit images
  let imageKeys = Object.keys(sectionImages);
  if (filter) {
    imageKeys = imageKeys.filter(filter);
  }
  if (maxImages) {
    imageKeys = imageKeys.slice(0, maxImages);
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const handleImageClick = (key: string) => {
    if (showLightbox) {
      setSelectedImage(key);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className={`grid gap-4 ${gridCols[columns]} ${className}`}>
        {imageKeys.map((key, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-lg ${
              showLightbox ? 'cursor-pointer hover:scale-105 transition-transform' : ''
            }`}
            style={aspectRatio ? { aspectRatio: aspectRatio.toString() } : undefined}
            onClick={() => handleImageClick(key)}
          >
            <OptimizedImage
              section={section}
              key={key}
              className="w-full h-full"
              fill={true}
              aspectRatio={aspectRatio}
              showLoading={true}
              showError={true}
            />
            
            {/* Overlay with image info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-end"
            >
              <div className="p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:text-gold transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Image */}
              <OptimizedImage
                section={section}
                key={selectedImage}
                className="max-w-full max-h-full object-contain"
                showLoading={true}
                showError={true}
              />

              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold capitalize">
                  {selectedImage.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-sm opacity-80">
                  {sectionImages[selectedImage]?.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Specialized gallery components
export function WineBottleGallery({ className = '', ...props }: Omit<ImageGalleryProps, 'section'>) {
  return (
    <ImageGallery
      section="wines"
      columns={4}
      aspectRatio={2/3}
      className={className}
      {...props}
    />
  );
}

export function VineyardGallery({ className = '', ...props }: Omit<ImageGalleryProps, 'section'>) {
  return (
    <ImageGallery
      section="valdobbiadene"
      columns={3}
      aspectRatio={16/9}
      className={className}
      {...props}
    />
  );
}

export function CasaValdoGallery({ className = '', ...props }: Omit<ImageGalleryProps, 'section'>) {
  return (
    <ImageGallery
      section="casaValdo"
      columns={3}
      aspectRatio={4/3}
      className={className}
      {...props}
    />
  );
}

export function LifestyleGallery({ className = '', ...props }: Omit<ImageGalleryProps, 'section'>) {
  return (
    <ImageGallery
      section="lifestyle"
      columns={4}
      aspectRatio={1}
      className={className}
      {...props}
    />
  );
}

export function TimelineGallery({ className = '', ...props }: Omit<ImageGalleryProps, 'section'>) {
  return (
    <ImageGallery
      section="timeline"
      columns={4}
      aspectRatio={3/2}
      className={className}
      {...props}
    />
  );
} 
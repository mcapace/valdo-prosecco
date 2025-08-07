import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressiveImageAdvancedProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'shimmer' | 'color';
  placeholderColor?: string;
  aspectRatio?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ProgressiveImageAdvanced({ 
  src, 
  alt, 
  className = '',
  priority = false,
  placeholder = 'blur',
  placeholderColor = '#D4AF37',
  aspectRatio,
  sizes = '100vw',
  onLoad,
  onError
}: ProgressiveImageAdvancedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const lowQualitySrc = `${src}?q=10&w=50`;

  const handleLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const renderPlaceholder = () => {
    switch (placeholder) {
      case 'shimmer':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        );
      case 'color':
        return (
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: placeholderColor }}
          />
        );
      default:
        return (
          <Image
            src={lowQualitySrc}
            alt={alt}
            fill
            className="object-cover scale-110 blur-lg"
            priority
            onError={handleError}
          />
        );
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {renderPlaceholder()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* High quality image */}
      <AnimatePresence>
        {!hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              priority={priority}
              onLoad={handleLoad}
              onError={handleError}
              quality={95}
              sizes={sizes}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">Image failed to load</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// CSS for shimmer animation
const shimmerCSS = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
`;

// Add the CSS to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerCSS;
  document.head.appendChild(style);
} 
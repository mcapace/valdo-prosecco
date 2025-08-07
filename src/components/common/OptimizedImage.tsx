import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageConfig, ImageConfig } from '@/lib/imageMapping';

interface OptimizedImageProps {
  section: string;
  key: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  onClick?: () => void;
  showLoading?: boolean;
  showError?: boolean;
  fallbackSrc?: string;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function OptimizedImage({
  section,
  key,
  className = '',
  priority = false,
  sizes = '100vw',
  fill = false,
  onClick,
  showLoading = true,
  showError = true,
  fallbackSrc,
  aspectRatio,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  // Get image configuration from mapping
  const imageConfig = getImageConfig(section, key);
  
  if (!imageConfig) {
    console.warn(`Image not found: ${section}.${key}`);
    return null;
  }

  const {
    path,
    alt,
    width = 800,
    height = 600,
    quality = 85,
    placeholder = 'blur',
    blurDataURL,
  } = imageConfig;

  // Use fallback if provided and error occurred
  const finalSrc = hasError && fallbackSrc ? fallbackSrc : path;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  const imageProps = {
    src: finalSrc,
    alt,
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    quality,
    priority: priority || imageConfig.priority,
    placeholder,
    blurDataURL,
    sizes,
    fill,
    className: `${className} ${objectFit === 'cover' ? 'object-cover' : 
      objectFit === 'contain' ? 'object-contain' : 
      objectFit === 'fill' ? 'object-fill' : 
      objectFit === 'none' ? 'object-none' : 'object-scale-down'}`,
    onLoad: handleLoad,
    onError: handleError,
    onClick,
    style: aspectRatio ? { aspectRatio: aspectRatio.toString() } : undefined,
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading State */}
      <AnimatePresence>
        {isLoading && showLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
            style={aspectRatio ? { aspectRatio: aspectRatio.toString() } : undefined}
          >
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {hasError && showError && !fallbackSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-100 flex items-center justify-center"
            style={aspectRatio ? { aspectRatio: aspectRatio.toString() } : undefined}
          >
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Image not available</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Image */}
      <Image {...imageProps} />
    </div>
  );
}

// Specialized components for common use cases
export function HeroImage({ className = '', ...props }: Omit<OptimizedImageProps, 'section' | 'key'>) {
  return (
    <OptimizedImage
      section="hero"
      key="background"
      className={`w-full h-full ${className}`}
      priority={true}
      fill={true}
      sizes="100vw"
      {...props}
    />
  );
}

export function LogoImage({ 
  variant = 'white', 
  className = '', 
  ...props 
}: Omit<OptimizedImageProps, 'section' | 'key'> & { variant?: 'white' | 'dark' }) {
  return (
    <OptimizedImage
      section="hero"
      key={variant === 'white' ? 'logo' : 'logoDark'}
      className={`object-contain ${className}`}
      priority={true}
      {...props}
    />
  );
}

export function WineBottleImage({ 
  wine, 
  className = '', 
  ...props 
}: Omit<OptimizedImageProps, 'section' | 'key'> & { wine: string }) {
  return (
    <OptimizedImage
      section="wines"
      key={wine}
      className={`object-contain ${className}`}
      aspectRatio={2/3}
      {...props}
    />
  );
}

export function VineyardImage({ 
  image, 
  className = '', 
  ...props 
}: Omit<OptimizedImageProps, 'section' | 'key'> & { image: string }) {
  return (
    <OptimizedImage
      section="valdobbiadene"
      key={image}
      className={`object-cover ${className}`}
      aspectRatio={16/9}
      {...props}
    />
  );
}

export function LifestyleImage({ 
  image, 
  className = '', 
  ...props 
}: Omit<OptimizedImageProps, 'section' | 'key'> & { image: string }) {
  return (
    <OptimizedImage
      section="lifestyle"
      key={image}
      className={`object-cover rounded-full ${className}`}
      aspectRatio={1}
      {...props}
    />
  );
}

export function CasaValdoImage({ 
  image, 
  className = '', 
  ...props 
}: Omit<OptimizedImageProps, 'section' | 'key'> & { image: string }) {
  return (
    <OptimizedImage
      section="casaValdo"
      key={image}
      className={`object-cover ${className}`}
      aspectRatio={4/3}
      {...props}
    />
  );
} 
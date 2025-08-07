'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  lazy = true,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    const element = document.querySelector(`[data-src="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src, lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Calculate optimal sizes if not provided
  const getOptimalSizes = () => {
    if (sizes) return sizes;
    
    if (width && height) {
      const aspectRatio = width / height;
      if (aspectRatio > 1.5) {
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
      } else if (aspectRatio > 1) {
        return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
      } else {
        return '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw';
      }
    }
    
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  // Calculate optimal quality based on image size
  const getOptimalQuality = () => {
    if (quality) return quality;
    
    if (width && height) {
      const totalPixels = width * height;
      if (totalPixels > 2000000) return 75; // Large images
      if (totalPixels > 500000) return 80;  // Medium images
      return 85; // Small images
    }
    
    return 85;
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width || '100%', height: height || '200px' }}
      >
        <div className="text-gray-500 text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  if (!isInView && lazy) {
    return (
      <div 
        className={`bg-gray-100 animate-pulse ${className}`}
        style={{ width: width || '100%', height: height || '200px' }}
        data-src={src}
      />
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0.7 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={getOptimalSizes()}
        quality={getOptimalQuality()}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-70' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy && !priority ? 'lazy' : 'eager'}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </motion.div>
  );
}

// HOC for common image patterns
export const HeroImage = (props: Omit<OptimizedImageProps, 'priority' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    priority={true}
    sizes="100vw"
    quality={90}
  />
);

export const ThumbnailImage = (props: Omit<OptimizedImageProps, 'sizes' | 'quality'>) => (
  <OptimizedImage
    {...props}
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    quality={80}
  />
);

export const BackgroundImage = (props: Omit<OptimizedImageProps, 'fill' | 'sizes'>) => (
  <OptimizedImage
    {...props}
    fill={true}
    sizes="100vw"
    quality={85}
  />
); 
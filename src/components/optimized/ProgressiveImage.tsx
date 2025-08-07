import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ProgressiveImage({ 
  src, 
  alt, 
  className,
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  priority?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const lowQualitySrc = `${src}?q=10&w=50`; // Low quality placeholder

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      <Image
        src={lowQualitySrc}
        alt={alt}
        fill
        className="object-cover scale-110 blur-lg"
        priority
      />
      
      {/* High quality image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          quality={95}
        />
      </motion.div>
    </div>
  );
} 
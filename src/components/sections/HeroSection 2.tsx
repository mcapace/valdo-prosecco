'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="hero-minimal">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/images/Vineyards/Copia di Copia di dettaglio vigneti.jpg"
          alt="Valdobbiadene Vineyards"
          fill
          className="hero-image"
          priority
        />
      </motion.div>
      
      {/* Glass overlay */}
      <div className="hero-overlay" style={{ backdropFilter: 'blur(2px)' }}></div>
      
      {/* Content with fade in */}
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="container-minimal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
            {/* Left side - Logo and text centered */}
            <motion.div 
              className="text-center lg:text-left flex flex-col items-center lg:items-start justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Image
                  src="/images/Logos/Valdo Logo New.png"
                  alt="Valdo Logo"
                  width={1000}
                  height={500}
                  className="w-auto h-48 lg:h-64 mx-auto lg:mx-0"
                />
              </motion.div>
              <motion.p 
                className="hero-subtitle text-5xl lg:text-6xl font-light text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                The Gold Standard of Prosecco
              </motion.p>
            </motion.div>

            {/* Right side - Large bottle */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Image
                  src="/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png"
                  alt="Valdo Marca Oro Prosecco DOC Brut"
                  width={500}
                  height={1200}
                  className="w-auto h-[500px] lg:h-[600px] drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          className="w-px h-16 bg-white/50"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection; 
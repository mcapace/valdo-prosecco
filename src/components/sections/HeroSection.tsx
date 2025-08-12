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
          src="/images/Vineyards/Copia di colline.jpg"
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
              className="text-center flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div 
                className="mb-6 lg:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Image
                  src="/images/Logos/Valdo Logo New.png"
                  alt="Valdo Logo"
                  width={1000}
                  height={500}
                  className="w-auto h-48 sm:h-56 lg:h-80 mx-auto"
                />
              </motion.div>
              
              {/* OCM Logo in Hero */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1.0 }}
              >
                <Image
                  src="/images/Logos/OCM Logo (1).png"
                  alt="OCM Logo"
                  width={400}
                  height={200}
                  className="w-auto h-16 sm:h-20 lg:h-24 mx-auto"
                />
              </motion.div>
              <motion.div 
                className="hero-subtitle text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2">
                  THE GOLD STANDARD
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
                  OF PROSECCO
                </div>
              </motion.div>
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
                  className="w-auto h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WineSpectatorCTA: React.FC = () => {
  const handleClick = () => {
    window.open('https://www.winespectator.com/articles/valdo-prosecco-100th-anniversary', '_blank');
  };

  return (
    <section className="relative py-12">
      {/* Content */}
      <div className="container-minimal">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Clickable Article Container */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-8 cursor-pointer hover:bg-white/90 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
            onClick={handleClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Quote */}
            <motion.blockquote 
              className="text-xl font-medium text-black italic mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              "Approaching its 100th anniversary, Valdo is the reference-point estate for exceptional terroir-driven Prosecco"
            </motion.blockquote>

            {/* Wine Spectator Logo Section */}
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-px bg-gray-400"></div>
                <Image
                  src="/images/Logos/WS Red  2.png"
                  alt="Wine Spectator"
                  width={150}
                  height={50}
                  className="h-8 w-auto"
                />
                <div className="w-16 h-px bg-gray-400"></div>
              </div>
            </motion.div>

            {/* CTA Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-600 font-medium mb-2">
                Featured in Wine Spectator
              </p>
              <p className="text-xs text-gray-500">
                Click to read the full article →
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WineSpectatorCTA; 
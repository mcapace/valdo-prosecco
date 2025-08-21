'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeritageCTA: React.FC = () => {
  const handleClick = () => {
    window.open('https://www.winespectator.com/sponsored-articles/valdo-the-gold-standard-of-prosecco', '_blank');
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
          {/* Heritage Content Container */}
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

            {/* Decorative Divider */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-px bg-gray-400"></div>
                <div className="text-2xl text-gold font-serif">★</div>
                <div className="w-16 h-px bg-gray-400"></div>
              </div>
            </motion.div>

            {/* Heritage Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-lg text-black font-medium mb-3">
                A Century of Excellence
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Since 1926, Valdo has been crafting exceptional Prosecco in the heart of Valdobbiadene, 
                maintaining the highest standards of quality and tradition that have made it a benchmark 
                for Italian sparkling wines worldwide.
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Read more about our story →
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeritageCTA; 
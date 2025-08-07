'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const OCMLogoSection = () => {
  return (
    <motion.section 
      className="py-12 bg-beige-light"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container-minimal">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center items-center"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/images/Logos/OCM logo.png"
              alt="OCM Logo"
              width={500}
              height={250}
              className="w-auto h-32 lg:h-40"
            />
          </motion.div>
          <motion.p 
            className="text-sm text-gray-600 mt-4 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Official Partner
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OCMLogoSection; 
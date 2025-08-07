'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const lifestyleImages = [
  {
    // LEFT CIRCLE - L'APERITIVO
    image: "/images/lifestyle/VALDO_1_2323138_prova 2.jpg", // The toasting image
    title: "L'APERITIVO",
    location: "Venice",
    description: "The golden hour ritual where friends gather"
  },
  {
    // CENTER CIRCLE - AL FRESCO
    image: "/images/lifestyle/_R5B1107_4_5.jpg", // The hand reaching for Numero 10 bottle
    title: "AL FRESCO", 
    location: "Valdobbiadene",
    description: "Dining under the stars with Valdo"
  },
  {
    // RIGHT CIRCLE - LA FESTA
    image: "/images/lifestyle/DSCF1017.jpg", // The celebration image
    title: "LA FESTA",
    location: "Milan",
    description: "Every moment is a celebration"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const LifestyleSection = () => {
  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src="/Videos /Drink Italian Video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability - lighter and more transparent */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-minimal">
        <motion.div 
          className="section-header text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="section-title text-white font-bold"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1 }}
          >
            DRINK PROSECCO LIKE AN ITALIAN!!!
          </motion.h2>
          <p className="section-subtitle text-white font-bold">Experience the Italian way of life</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          initial="hidden"
          whileInView="visible"
        >
          {lifestyleImages.map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center"
              variants={fadeInUp}
            >
              {/* Glass circle container */}
              <motion.div 
                className="relative w-64 h-64 mx-auto mb-4 group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glass border effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500/30 to-gold-500/10 backdrop-blur-sm p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white/90 backdrop-blur-md">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image 
                        src={item.image}
                        alt={item.title}
                        width={256}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Location badge moved below circle */}
              <motion.div 
                className="mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                <span className="px-4 py-2 rounded-full text-sm
                  bg-white/80 backdrop-blur-md border border-gold-500/30 text-gray-800 font-medium">
                  {item.location}
                </span>
              </motion.div>
              
              <motion.h3 
                className="text-xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-sm text-white font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LifestyleSection; 
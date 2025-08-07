'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const timelineData = [
  {
    year: '1926',
    title: 'THE FOUNDATION',
    description: 'It all began in Valdobbiadene, Veneto, Italy in 1926 with 4 entrepreneurs who recognized Valdobbiadene as the perfect location for producing exceptional sparkling wines with the local indigenous grape- the Glera grape. The company was called Societa\' Anonima Vini Superiori- the very first sparkling wine house in the region',
    image: '/images/Historical Photos/Copia di imbottigliamento-1408x.jpg',
    icon: '🏗️'
  },
  {
    year: '1938',
    title: 'THE BOLLA FAMILY TAKES OVER',
    description: 'Sergio Bolla was passionate about the hills of Valdobbiadene and visited there often from his home in Soave, Veneto. On his many visits to Valdobbiadene, he came to enjoy this sparkling wine from Societa Anonima known as Prosecco. He enjoyed it so much that in 1938, in the name of the Bolla Family, he purchased the winery',
    image: '/images/Historical Photos/Copia di Presidente fondatore Sergio Bolla.jpg',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    year: '1951',
    title: 'THE VALDO NAME IS BORN',
    description: 'The Bolla Family changed the name of the company to Valdo; in honor of their new homeland: Valdobbiadene ("Vahl-doh-BEE-ah-deh-neh" in Veneto Italy)',
    image: '/images/Historical Photos/Copia di bottiglia-storia-1408x.jpg',
    icon: '🏷️'
  },
  {
    year: '1958',
    title: 'EXPANSION ACROSS ITALY',
    description: 'The Bolla family continued to invest in Valdobbiadene and their winery- building a reputation throughout Italy for their sparkling wines- for their quality & elegance',
    image: '/images/Historical Photos/Picture2.jpg',
    icon: '🇮🇹'
  },
  {
    year: '1969/2009',
    title: 'PROSECCO FORMALLY RECOGNIZED',
    description: 'While the name was in use earlier, the formal recognition of Prosecco as a DOC (Denominazione di Origine Controllata) came in 1969, and the DOCG (Denominazione di Origine Controllata e Garantita) for the highest quality Prosecco in the Conegliano Valdobbiadene area was granted in 2009',
    image: '/images/Vineyards/Copia di Copia di drone_territorio_valdobbiadene.jpg',
    icon: '🏆'
  },
  {
    year: '1980s',
    title: 'GLOBAL CONQUEST BEGINS',
    description: 'Sergio\'s son, Pierluigi Bolla, takes over the helm of Valdo and leads the region\'s effort to conquest foreign markets, especially Germany, Japan, and the United States',
    image: '/images/Historical Photos/Copia di valdo-90-famiglia-bolla-bn-1408x.jpg',
    icon: '🌍'
  },
  {
    year: 'TODAY',
    title: 'RECOGNIZED WORLDWIDE',
    description: 'Valdo today is recognized in Italy and worldwide as a leading producer of DOC/DOCG Prosecco wines',
    image: '/images/lifestyle/Copia di BICCHIERE.jpg',
    icon: '👑'
  }
];

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const handleTimelineClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <motion.section 
      ref={containerRef}
      className="section-minimal bg-beige-light relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container-minimal relative z-10">
        <motion.div 
          className="section-header text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1 }}
          >
            THE BOLLA LEGACY
          </motion.h2>
          <p className="section-subtitle">A tradition of excellence since 1926</p>
        </motion.div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
              style={{ y }}
            />
            
            {/* Timeline Items */}
            <div className="relative flex justify-between items-center py-16">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="relative flex flex-col items-center group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleTimelineClick(index)}
                >
                  {/* Timeline Dot */}
                  <motion.div 
                    className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-gold border-gold scale-125' 
                        : 'bg-beige-light border-gold hover:scale-110'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                  
                  {/* Year */}
                  <motion.span 
                    className={`text-sm font-medium mt-4 transition-colors duration-300 ${
                      activeIndex === index ? 'text-gold' : 'text-gray-500'
                    }`}
                  >
                    {item.year}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <motion.div 
            className="mt-12"
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-4">
                    {timelineData[activeIndex].title}
                  </h3>
                  <p className="text-black leading-relaxed font-medium">
                    {timelineData[activeIndex].description}
                  </p>
                </div>
              </div>

              {/* Image */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={timelineData[activeIndex].image}
                    alt={timelineData[activeIndex].title}
                    width={500}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden">
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Line */}
                {index < timelineData.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gold/30" />
                )}

                <div className="flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gold mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-semibold text-black mb-2">
                        {item.title}
                      </h3>
                      <p className="text-black leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>

                    {/* Mobile Image */}
                    <motion.div 
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TimelineSection; 
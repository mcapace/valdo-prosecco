'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const timelineData = [
  {
    year: '1926',
    title: 'THE FOUNDATION',
    description: 'It all began in Valdobbiadene, Veneto, Italy in 1926 with 4 entrepreneurs who recognized Valdobbiadene as the perfect location for producing exceptional sparkling wines with the local indigenous grape- the Glera grape. The company was called Societa\' Anonima Vini Superiori- the very first sparkling wine house in the region',
    image: '/images/Historical Photos/Copia di imbottigliamento-1408x.jpg'
  },
  {
    year: '1938',
    title: 'THE BOLLA FAMILY TAKES OVER',
    description: 'Sergio Bolla was passionate about the hills of Valdobbiadene and visited there often from his home in Soave, Veneto. On his many visits to Valdobbiadene, he came to enjoy this sparkling wine from Societa Anonima known as Prosecco. He enjoyed it so much that in 1938, in the name of the Bolla Family, he purchased the winery',
    image: '/images/Historical Photos/Copia di Presidente fondatore Sergio Bolla.jpg'
  },
  {
    year: '1951',
    title: 'THE VALDO NAME IS BORN',
    description: 'The Bolla Family changed the name of the company to Valdo; in honor of their new homeland: Valdobbiadene ("Vahl-doh-BEE-ah-deh-neh") in Veneto, Italy',
    image: '/images/Historical Photos/Copia di bottiglia-storia-1408x.jpg'
  },
  {
    year: '1958',
    title: 'EXPANSION ACROSS ITALY',
    description: 'The Bolla family continued to invest in Valdobbiadene and their winery- building a reputation throughout Italy for their sparkling wine with quality & elegance',
    image: '/images/Historical Photos/Picture2.jpg'
  },
  {
    year: '1969/2009',
    title: 'PROSECCO FORMALLY RECOGNIZED',
    description: 'While the name was in use earlier, the formal recognition of Prosecco as a DOC (Denominazione di Origine Controllata) came in 1969, and the DOCG (Denominazione di Origine Controllata e Garantita) for the highest quality Prosecco in the Conegliano Valdobbiadene area was granted in 2009',
    image: '/images/Vineyards/Copia di Copia di drone_territorio_valdobbiadene.jpg'
  },
  {
    year: '1980s',
    title: 'GLOBAL CONQUEST BEGINS',
    description: 'Sergio\'s son, Pierluigi Bolla, takes over the helm of Valdo and leads the region\'s effort to conquest foreign markets, especially Germany, Japan, and the United States',
    image: '/images/Historical Photos/Copia di valdo-90-famiglia-bolla-bn-1408x.jpg'
  },
  {
    year: 'TODAY',
    title: 'RECOGNIZED WORLDWIDE',
    description: 'Valdo today is recognized in Italy and worldwide as a leading producer of DOC/DOCG Prosecco wines',
    image: '/images/lifestyle/Copia di BICCHIERE.jpg'
  }
];

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Auto-play functionality with longer duration
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineData.length);
    }, 8000); // Increased from default to 8 seconds for better reading time

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTimelineClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
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
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Timeline Line */}
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
              style={{ y }}
            />

            {/* Timeline Dots */}
            <div className="relative flex justify-between items-center py-16">
              {timelineData.map((item, index) => (
                <motion.button
                  key={item.year}
                  className={`relative z-10 w-4 h-4 rounded-full transition-all duration-500 ${
                    index === activeIndex ? 'bg-gold scale-125' : 'bg-gray-300 hover:bg-gold/70'
                  }`}
                  onClick={() => handleTimelineClick(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Timeline Years */}
            <div className="relative flex justify-between items-center -mt-8">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`text-sm font-semibold transition-all duration-500 ${
                    index === activeIndex ? 'text-gold scale-110' : 'text-gray-500'
                  }`}
                >
                  {item.year}
                </motion.div>
              ))}
            </div>

            {/* Content Panel */}
            <motion.div 
              className="mt-16 text-center"
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h3 
                className="text-2xl font-bold mb-4 text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {timelineData[activeIndex].title}
              </motion.h3>
              <motion.p 
                className="text-lg text-black leading-relaxed max-w-4xl mx-auto mb-8 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {timelineData[activeIndex].description}
              </motion.p>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Image
                  src={timelineData[activeIndex].image}
                  alt={timelineData[activeIndex].title}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden">
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold/30"></div>
                
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-gold rounded-full transform -translate-x-1/2"></div>
                
                {/* Content */}
                <div className="ml-16">
                  <div className="mb-4">
                    <div className="text-gold font-semibold text-sm mb-1">{item.year}</div>
                    <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
                    <p className="text-base text-black leading-relaxed mb-6 font-medium">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Image - Centered on mobile */}
                  <div className="flex justify-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={350}
                      height={250}
                      className="rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                    />
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
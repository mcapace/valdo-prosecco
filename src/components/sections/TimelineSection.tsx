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
          className="section-header text-center mb-16"
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

        {/* Desktop Spiral Staircase Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Central Timeline Line */}
            <motion.div 
              className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gold/30 via-gold to-gold/30 transform -translate-x-1/2"
              style={{ y }}
            />
            
            {/* Timeline Items */}
            <div className="space-y-24">
              {timelineData.map((item, index) => {
                const isEven = index % 2 === 0;
                const isActive = activeIndex === index;
                
                return (
                  <motion.div
                    key={item.year}
                    className="relative"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    onClick={() => handleTimelineClick(index)}
                  >
                    {/* Curved Connector Line */}
                    {index < timelineData.length - 1 && (
                      <motion.div 
                        className={`absolute top-20 w-32 h-32 border-2 border-gold/30 rounded-full ${
                          isEven ? 'left-1/2' : 'right-1/2'
                        } transform -translate-y-1/2 ${
                          isEven ? '-translate-x-full' : 'translate-x-full'
                        }`}
                        style={{
                          borderTop: 'none',
                          borderLeft: isEven ? 'none' : '2px solid rgba(212, 175, 55, 0.3)',
                          borderRight: isEven ? '2px solid rgba(212, 175, 55, 0.3)' : 'none',
                          borderBottom: '2px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: isEven ? '0 0 50% 50%' : '0 0 50% 50%',
                          transform: isEven 
                            ? 'translate(-100%, -50%) rotate(90deg)' 
                            : 'translate(100%, -50%) rotate(-90deg)'
                        }}
                      />
                    )}

                    <div className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-16`}>
                      {/* Content Side */}
                      <motion.div 
                        className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}
                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      >
                        <div className={`max-w-lg ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                          {/* Year Badge */}
                          <motion.div 
                            className={`inline-flex items-center px-4 py-2 bg-gold text-white rounded-full text-sm font-bold mb-4 ${
                              isActive ? 'scale-110' : 'scale-100'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.year}
                          </motion.div>
                          
                          {/* Title */}
                          <h3 className={`text-2xl font-semibold text-black mb-4 ${
                            isActive ? 'text-gold' : ''
                          }`}>
                            {item.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-black leading-relaxed font-medium text-lg">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>

                      {/* Central Timeline Dot */}
                      <motion.div 
                        className="relative z-10 flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div 
                          className={`w-16 h-16 rounded-full border-4 transition-all duration-500 flex items-center justify-center ${
                            isActive 
                              ? 'bg-gold border-gold scale-125 shadow-2xl' 
                              : 'bg-beige-light border-gold hover:border-gold/80'
                          }`}
                        >
                          <motion.div 
                            className={`w-8 h-8 rounded-full ${
                              isActive ? 'bg-white' : 'bg-gold'
                            }`}
                            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Image Side */}
                      <motion.div 
                        className="flex-1"
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      >
                        <motion.div 
                          className={`relative overflow-hidden rounded-2xl shadow-2xl ${
                            isActive ? 'ring-4 ring-gold/30' : ''
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={500}
                            height={400}
                            className="w-full h-80 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          
                          {/* Wine Glass Icon */}
                          <motion.div 
                            className="absolute top-4 right-4 w-8 h-8 bg-gold/90 rounded-full flex items-center justify-center"
                            animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tablet Timeline - Medium screens */}
        <div className="hidden md:block lg:hidden">
          <div className="space-y-8">
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
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gold/30" />
                )}

                <div className="flex items-start space-x-8">
                  {/* Timeline Dot */}
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.year}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gold mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-semibold text-black mb-3">
                        {item.title}
                      </h3>
                      <p className="text-black leading-relaxed font-medium text-base">
                        {item.description}
                      </p>
                    </div>

                    {/* Tablet Image */}
                    <motion.div 
                      className="relative overflow-hidden rounded-xl shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden">
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
                    {item.year}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gold mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        {item.title}
                      </h3>
                      <p className="text-black leading-relaxed font-medium text-sm">
                        {item.description}
                      </p>
                    </div>

                    {/* Mobile Image - Centered */}
                    <div className="flex justify-center">
                      <motion.div 
                        className="relative overflow-hidden rounded-xl shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={350}
                          height={250}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                    </div>
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
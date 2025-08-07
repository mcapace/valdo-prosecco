'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const wines = [
  {
    name: 'MARCA ORO',
    subtitle: 'DOC',
    image: '/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png',
    description: 'The Marca Oro yellow label was first introduced in Italy in the 1950s by Sergio Bolla, founder of Valdo and father of current Chairman & CEO Pierluigi Bolla.',
    details: [
      'Leader of the Prosecco Spumante market in Italy and Germany',
      'Crafted with the best selection of Glera grapes from Veneto and Friuli regions',
      'Harvested from alluvial and clay soils for optimal quality',
      'Label inspired by Venetian lace tradition (late 15th century)',
      'Symbol of patience, dedication, and skill representing local craft excellence'
    ]
  },
  {
    name: 'NUMERO 10',
    subtitle: 'DOCG',
    image: '/images/Bottle Shots/Copia_di_Valdo_Numero_10_DOCG_75cl__2_-removebg-preview.png',
    description: 'Unique in its kind, stems from the intuition of the Bolla family.',
    details: [
      '100% Glera crafted using the Classic Method',
      'At least 10 months of refermentation and ageing in the bottle',
      'Combines fruity and delicate characteristics of Glera grape',
      'Body and personality obtained via refermentation in the bottle',
      'Ripe fruity scents blend with honeyed and complex nuances',
      'Yields a unique and surprising experience in the glass'
    ]
  },
  {
    name: 'SUPERIORE',
    subtitle: 'DOCG',
    image: '/images/Bottle Shots/Valdobbiadene DOCG USA.png',
    description: 'A tribute to the tradition of Valdobbiadene, a proud tribute to the history of Valdo, which began in 1926 and has always looked towards the future.',
    details: [
      'Carefully produced with research in the winery',
      'Triumphant Brut dosage expresses the passion of the Bolla family',
      'Vocation and typicality of the terroir',
      'Futurist inspiration from 1926 Venice Biennale',
      'Label draws inspiration from the works of Giacomo Balla',
      'Leading exponent of the Futurist movement'
    ]
  },
  {
    name: 'MARCA ORO ROSÉ',
    subtitle: 'DOC',
    image: '/images/Bottle Shots/Rose.png',
    description: 'Marca Oro Prosecco DOC Rosé represents an extension of the values and the range of Marca Oro.',
    details: [
      'Intriguing product with an eye-catching colour and strong personality',
      'Splendid rosé version of the world\'s most popular sparkling wine',
      'Glera grape meets Pinot Noir to create a sparkling rosé Brut',
      'Label inspired by Venetian lace tradition (late 15th century)',
      'Symbol of patience, dedication, and skill',
      'Represents local craft tradition, a synonym of excellence worldwide'
    ]
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

const WineModal = ({ wine, isOpen, onClose }: { wine: any; isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left side - Bottle image */}
              <div className="lg:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-beige-light to-beige">
                <motion.div
                  initial={{ scale: 0.8, rotateY: -15 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={wine.image}
                    alt={wine.name}
                    width={500}
                    height={1000}
                    className="w-auto h-[400px] lg:h-[500px] drop-shadow-2xl"
                  />
                </motion.div>
              </div>
              
              {/* Right side - Wine details */}
              <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center overflow-y-auto">
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-2">{wine.name}</h2>
                  <p className="text-lg text-red-600 font-semibold mb-4">{wine.subtitle}</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-base lg:text-lg text-black font-normal leading-relaxed">
                      {wine.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-3">Key Features:</h3>
                    <ul className="space-y-2">
                      {wine.details.map((detail: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-600 font-bold mr-2 mt-1">•</span>
                          <span className="text-sm lg:text-base text-gray-700 font-normal leading-relaxed">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <motion.button
                  className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const WineSection = () => {
  const [selectedWine, setSelectedWine] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWineClick = (wine: any) => {
    setSelectedWine(wine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWine(null);
  };

  return (
    <>
      <motion.section 
        className="section-minimal bg-beige-light"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="container-minimal">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="section-title">THE WINES</h2>
            <p className="section-subtitle">The leading DOC/DOCG Prosecco in Italy</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            {wines.map((wine, index) => (
              <motion.div
                key={wine.name}
                className="wine-card wine-card-glass cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => handleWineClick(wine)}
              >
                <motion.div 
                  className="wine-image"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={wine.image}
                    alt={wine.name}
                    width={500}
                    height={1000}
                    className="h-full w-auto object-contain filter drop-shadow-lg"
                  />
                </motion.div>
                <motion.h3 
                  className="wine-name text-lg font-semibold text-black"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {wine.name}
                </motion.h3>
                <motion.p 
                  className="wine-type text-base font-semibold text-red-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  {wine.subtitle}
                </motion.p>
                <motion.p 
                  className="text-xs text-gray-500 mt-2 text-center font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                >
                  Click for details
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Call to Action - Link to Valdo US Website */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="https://us.valdo.com/collections/all"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-minimal gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore All Valdo Wines</span>
            </motion.a>
            <p className="text-sm text-gray-600 mt-3">
              Discover our complete collection of DOC/DOCG Prosecco wines
            </p>
          </motion.div>
        </div>
      </motion.section>

      <WineModal 
        wine={selectedWine} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default WineSection; 
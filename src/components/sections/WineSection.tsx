'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const wines = [
  {
    name: 'MARCA ORO',
    subtitle: 'DOC',
    image: '/images/Bottle Shots/Marca Oro Prosecco DOC Brut USA.png',
    description: 'THE MARCA ORO YELLOW LABEL WAS FIRST INTRODUCED IN ITALY IN THE 1950\'S BY SERGIO BOLLA, FOUNDER OF VALDO AND FATHER OF CURRENT CHAIRMAN & CEO PIERLUIGI BOLLA.',
    details: 'SINCE THEN THIS LABEL BECAME AN AMBASSADOR OF HIGH QUALITY PROSECCO AROUND THE WORLD AND TODAY MARCA ORO IS THE LEADER OF THE PROSECCO SPUMANTE MARKET IN ITALY AND GERMANY. THIS BRUT PROSECCO DOC IS CRAFTED WITH THE BEST SELECTION OF GLERA GRAPES HARVESTED IN THE VENETO AND FRIULI REGIONS FROM ALLUVIAL AND CLAY SOILS. THE LABEL IS INSPIRED BY VENETIAN LACE, A TRADITION IN THE VENETIAN LAGOON FOR SEVERAL CENTURIES (LATE 15TH CENTURY). A SYMBOL OF PATIENCE, DEDICATION AND SKILL, IT REPRESENTS A LOCAL CRAFT TRADITION, A SYNONYM OF EXCELLENCE THROUGHOUT THE WORLD.'
  },
  {
    name: 'NUMERO 10',
    subtitle: 'DOCG',
    image: '/images/Bottle Shots/Copia_di_Valdo_Numero_10_DOCG_75cl__2_-removebg-preview.png',
    description: 'UNIQUE IN ITS KIND, STEMS FROM THE INTUITION OF THE BOLLA FAMILY.',
    details: '100% GLERA CRAFTED USING THE CLASSIC METHOD, INVOLVING AT LEAST 10 MONTHS OF REFERMENTATION AND AGEING IN THE BOTTLE (CLASSIC METHOD). A SPARKLING WINE THAT ABLY COMBINES THE TYPICAL FRUITY AND DELICATE CHARACTERISTICS OF THE GLERA GRAPE WITH THE BODY AND PERSONALITY OBTAINED VIA REFERMENTATION IN THE BOTTLE. RIPE FRUITY SCENTS BLEND WITH HONEYED AND COMPLEX NUANCES, YIELDING A UNIQUE AND SURPRISING EXPERIENCE IN THE GLASS.'
  },
  {
    name: 'SUPERIORE',
    subtitle: 'DOCG',
    image: '/images/Bottle Shots/Valdobbiadene DOCG USA.png',
    description: 'A TRIBUTE TO THE TRADITION OF VALDOBBIADENE, A PROUD TRIBUTE TO THE HISTORY OF VALDO, WHICH BEGAN IN 1926 AND HAS ALWAYS LOOKED TOWARDS THE FUTURE.',
    details: 'CAREFULLY PRODUCED WITH RESEARCH IN THE WINERY, ITS TRIUMPHANT BRUT DOSAGE EXPRESSES THE PASSION OF THE BOLLA FAMILY AND THE VOCATION AND TYPICALITY OF THE TERROIR. FUTURIST INSPIRATION: IN 1926, THE YEAR THE WINERY WAS FOUNDED, THE FUTURIST ART MOVEMENT GAINED APPROVAL AT THE VENICE BIENNALE. THE LABEL OF THIS "SUPERIORE BRUT" DRAWS INSPIRATION FROM THE WORKS OF GIACOMO BALLA, A LEADING EXPONENT OF THE FUTURIST MOVEMENT.'
  },
  {
    name: 'MARCA ORO ROSÉ',
    subtitle: 'DOC',
    image: '/images/Bottle Shots/Rose.png',
    description: 'MARCA ORO PROSECCO DOC ROSÉ REPRESENTS AN EXTENSION OF THE VALUES AND THE RANGE OF MARCA ORO.',
    details: 'IT IS AN INTRIGUING PRODUCT WITH AN EYE-CATCHING COLOUR AND A STRONG PERSONALITY. IT IS A SPLENDID ROSÉ VERSION OF THE WORLD\'S MOST POPULAR SPARKLING WINE. HERE, THE GLERA GRAPE MEETS PINOT NOIR TO CREATE A SPARKLING ROSÉ BRUT. THE LABEL IS INSPIRED BY VENETIAN LACE, A TRADITION IN THE VENETIAN LAGOON FOR SEVERAL CENTURIES (LATE 15TH CENTURY). A SYMBOL OF PATIENCE, DEDICATION AND SKILL, IT REPRESENTS A LOCAL CRAFT TRADITION, A SYNONYM OF EXCELLENCE THROUGHOUT THE WORLD.'
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
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm lg:text-base text-black font-medium leading-relaxed">
                      {wine.description}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs lg:text-sm text-gray-700 font-medium leading-relaxed">
                      {wine.details}
                    </p>
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
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const CasaValdoSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const casaValdoImages = [
    {
      src: "/images/Casa Valdo/602322.jpg",
      alt: "Casa Valdo Exterior",
      title: "CASA VALDO EXTERIOR"
    },
    {
      src: "/images/Casa Valdo/602338.jpg",
      alt: "Luxury Suite",
      title: "LUXURY SUITE"
    },
    {
      src: "/images/Casa Valdo/602376.jpg",
      alt: "Wine Cellar",
      title: "WINE CELLAR"
    },
    {
      src: "/images/Casa Valdo/602394.jpg",
      alt: "Dining Experience",
      title: "DINING EXPERIENCE"
    },
    {
      src: "/images/Casa Valdo/602401.jpg",
      alt: "Garden Terrace",
      title: "GARDEN TERRACE"
    },
    {
      src: "/images/Casa Valdo/IMG_2470.jpeg",
      alt: "Vineyard Views",
      title: "VINEYARD VIEWS"
    }
  ];

  const features = [
    {
      title: "ELEGANT SUITES",
      description: "Beautifully appointed rooms"
    },
    {
      title: "WINE TASTING",
      description: "Exclusive Valdo experiences"
    },
    {
      title: "VINEYARD TOURS",
      description: "Guided tours of our estate"
    },
    {
      title: "GARDEN TERRACE",
      description: "Stunning outdoor spaces"
    }
  ];

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="section-minimal bg-beige-light">
      <div className="container-minimal">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">CASA VALDO</h2>
          <p className="section-subtitle">
            Nestled at the heart of Vigna Pradase is Casa Valdo, the new hospitality country house of the Bolla family, now inviting enotourists to indulge in the authentic Prosecco experience. Experience luxury in the heart of Valdobbiadene where luxury hospitality meets the rich heritage of Prosecco production.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {casaValdoImages.map((image) => (
            <motion.div 
              key={image.title} 
              className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleImageClick(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-black">{feature.title}</h3>
              <p className="text-sm text-black font-medium">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <h3 className="text-headline font-semibold text-black mb-6">YOUR GATEWAY TO VALDOBBIADENE</h3>
          <h4 className="text-title text-gold mb-4 font-semibold">PLAN YOUR STAY AT CASA VALDO</h4>
          <p className="text-body text-black mb-8 max-w-3xl mx-auto font-medium">
            Experience the perfect blend of luxury hospitality and authentic Italian culture in the heart of the Prosecco region.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://casavaldo.it/en/homepage/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-minimal gold"
            >
              Visit Casa Valdo Website
            </a>
            <a 
              href="https://booking.slope.it/c503c863-aedc-4ba8-b1aa-b3a1f3a2df5e" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-minimal"
            >
              Contact for Reservations
            </a>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all z-10"
              >
                ×
              </button>
              <Image
                src={selectedImage}
                alt="Expanded view"
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CasaValdoSection; 
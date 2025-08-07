'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Heart, Star } from 'lucide-react';

const LifestyleSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const lifestyleCategories = [
    {
      icon: Sparkles,
      title: "L'APERITIVO",
      description: "The golden hour ritual",
      image: '/images/lifestyle/_R5B0940.jpg'
    },
    {
      icon: Heart,
      title: "AL FRESCO",
      description: "Dining under the stars",
      image: '/images/lifestyle/5.jpg'
    },
    {
      icon: Star,
      title: "LA FESTA",
      description: "Every moment is a celebration",
      image: '/images/lifestyle/Picture4.png'
    }
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Minimalist Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-valdo-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-elegant relative z-10">
        {/* Minimalist Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-trajan text-white mb-4">
            DRINK PROSECCO<br />LIKE AN ITALIAN!!!
          </h2>
          <p className="text-valdo-gold font-raleway text-lg">
            "Salute e Prosecco per tutti!"
          </p>
        </motion.div>

        {/* Minimalist Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {lifestyleCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden backdrop-blur-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Minimalist Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Minimalist Icon */}
                  <div className="absolute top-4 right-4">
                    <category.icon className="w-6 h-6 text-valdo-gold" />
                  </div>
                </div>

                {/* Minimalist Content */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-trajan text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-white/70 font-raleway">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimalist Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="glass-card p-8 rounded-2xl backdrop-blur-xl max-w-2xl mx-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 className="text-2xl font-trajan text-white mb-4">
              Experience La Dolce Vita
            </h3>
            <p className="text-white/70 font-raleway mb-6">
              Discover the authentic Italian way of life with Valdo
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 rounded-full font-raleway text-white border border-valdo-gold/30 hover:border-valdo-gold/60 transition-colors"
            >
              Discover Italian Life
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleSection; 
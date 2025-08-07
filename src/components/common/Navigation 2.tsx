'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'The Bolla Legacy', href: '#timeline' },
    { name: 'Valdobbiadene', href: '#valdobbiadene' },
    { name: 'Valdo Difference', href: '#difference' },
    { name: 'The Wines', href: '#wines' },
    { name: 'Casa Valdo', href: '#casa' },
    { name: 'Like an Italian', href: '#lifestyle' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.5s ease',
          backgroundColor: '#98231f',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <motion.button 
            onClick={scrollToTop}
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/images/Logos/WS White.png" 
              alt="Wine Spectator" 
              style={{ height: '48px' }}
            />
          </motion.button>

          {/* Desktop Navigation */}
          <motion.div 
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }} 
            className="desktop-menu"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-semibold text-white transition-colors duration-300 tracking-wide bg-transparent border-none cursor-pointer px-3 py-2 rounded"
                whileHover={{ 
                  y: -2,
                  color: '#f0f0f0',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f0f0f0'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#ffffff'}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            style={{ display: 'none' }} 
            className="mobile-menu-button"
          >
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '8px',
                borderRadius: '4px',
                color: '#ffffff',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              style={{
                position: 'absolute',
                top: '64px',
                left: 0,
                right: 0,
                padding: '16px 24px',
                backgroundColor: '#98231f',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {menuItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-semibold text-white text-left px-3 py-2 rounded transition-all duration-300 bg-transparent border-none cursor-pointer"
                    variants={fadeInUp}
                    whileHover={{
                      color: '#f0f0f0',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      x: 5
                    }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style jsx global>{`
        @media (max-width: 767px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation; 
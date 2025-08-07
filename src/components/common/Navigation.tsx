'use client';

import { useState, useEffect } from 'react';

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

  return (
    <nav
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
        <button 
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
        >
          <img 
            src="/images/Logos/WS White.png" 
            alt="Wine Spectator" 
            style={{ height: '48px' }}
          />
        </button>

        {/* Desktop Navigation */}
        <div 
          className="desktop-menu"
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center'
          }}
        >
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                color: '#ffffff',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            padding: '8px',
            borderRadius: '4px',
            color: '#ffffff',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
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
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  scrollToSection(item.href);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#ffffff',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

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
    </nav>
  );
};

export default Navigation; 
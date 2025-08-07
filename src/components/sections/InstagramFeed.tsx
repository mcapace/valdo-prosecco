'use client';

import { useEffect, useState } from 'react';

export default function InstagramFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let cleanupInterval: NodeJS.Timeout;

    const initializeWidget = () => {
      // Wait for Elfsight to be available
      if (typeof window !== 'undefined' && window.elfsight) {
        try {
          window.elfsight.init();
          console.log('Elfsight initialized successfully');
          
          // Check if widget loads within 5 seconds (shorter timeout)
          timeoutId = setTimeout(() => {
            const widget = document.querySelector('.elfsight-app-9c837975-e4de-4ea7-8c68-14c70f78a160');
            if (widget && widget.children.length > 0) {
              console.log('Widget loaded successfully');
              setIsLoading(false);
              
              // Start cleaning up banners and improving appearance
              cleanupBanners();
            } else {
              console.log('Widget failed to load content, showing fallback');
              setHasError(true);
              setIsLoading(false);
            }
          }, 5000); // Reduced to 5 seconds
        } catch (error) {
          console.error('Error initializing Elfsight:', error);
          setHasError(true);
          setIsLoading(false);
        }
      } else {
        // If Elfsight is not available after 3 seconds, show fallback
        setTimeout(() => {
          if (typeof window !== 'undefined' && !window.elfsight) {
            console.log('Elfsight not available after timeout, showing fallback');
            setHasError(true);
            setIsLoading(false);
          } else {
            initializeWidget();
          }
        }, 3000);
      }
    };

    const cleanupBanners = () => {
      // Function to remove banners and promotional elements
      const removeBanners = () => {
        // Remove elements containing promotional text
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
          const text = element.textContent || '';
          if (text.includes('Free Instagram Feed widget') || 
              text.includes('Free Instagram') ||
              text.includes('widget') ||
              text.includes('banner') ||
              text.includes('promo')) {
            (element as HTMLElement).style.display = 'none';
            element.remove();
          }
        });

        // Remove red close buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
          const style = window.getComputedStyle(button);
          if (style.backgroundColor.includes('red') || 
              style.background.includes('red') ||
              button.style.backgroundColor === 'red' ||
              button.style.background === 'red') {
            button.style.display = 'none';
            button.remove();
          }
        });

        // Remove elements with specific classes that might be banners
        const bannerSelectors = [
          '[class*="banner"]',
          '[class*="promo"]',
          '[class*="advertisement"]',
          '[class*="notification"]',
          '[class*="close"]',
          '[class*="dismiss"]',
          '[class*="free"]'
        ];

        bannerSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            (element as HTMLElement).style.display = 'none';
            element.remove();
          });
        });

        // Improve widget appearance
        const widget = document.querySelector('.elfsight-app-9c837975-e4de-4ea7-8c68-14c70f78a160');
        if (widget) {
          (widget as HTMLElement).style.borderRadius = '12px';
          (widget as HTMLElement).style.overflow = 'hidden';
          (widget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }

        // Style Instagram images
        const images = document.querySelectorAll('.elfsight-app-9c837975-e4de-4ea7-8c68-14c70f78a160 img');
        images.forEach(img => {
          (img as HTMLElement).style.borderRadius = '8px';
          (img as HTMLElement).style.transition = 'transform 0.3s ease';
        });
      };

      // Run cleanup immediately
      removeBanners();

      // Set up interval to continuously clean up (in case new elements are added)
      cleanupInterval = setInterval(removeBanners, 1000);

      // Stop cleanup after 30 seconds
      setTimeout(() => {
        if (cleanupInterval) {
          clearInterval(cleanupInterval);
        }
      }, 30000);
    };

    // Start initialization
    initializeWidget();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (cleanupInterval) clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <section className="py-16 bg-beige-light">
      <div className="container-minimal">
        <div className="text-center">
          <h2 className="text-headline font-light mb-8">Follow Our Journey</h2>
          <p className="text-body text-gray-500 mb-12">
            Discover the Valdo lifestyle and stay connected with our latest updates
          </p>
          
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {hasError ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-6">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Follow @valdoamericas on Instagram</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Get the latest updates, behind-the-scenes content, and exclusive offers from Valdo Americas.
                </p>
                <a 
                  href="https://www.instagram.com/valdoamericas/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow @valdoamericas
                </a>
              </div>
            ) : (
              <>
                {/* Elfsight Instagram Feed */}
                <div 
                  className="elfsight-app-9c837975-e4de-4ea7-8c68-14c70f78a160" 
                  data-elfsight-app-lazy
                />
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Instagram feed...</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 
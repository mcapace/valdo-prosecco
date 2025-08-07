'use client';

import { useEffect, useState } from 'react';

export default function InstagramFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Try to load Instagram embed script
    const loadInstagramScript = () => {
      if (typeof window !== 'undefined' && !window.instgrm) {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => {
          console.log('Instagram embed script loaded');
          if (window.instgrm && typeof window.instgrm.Embeds === 'object') {
            window.instgrm.Embeds.process();
          }
        };
        script.onerror = () => {
          console.error('Failed to load Instagram embed script');
          setHasError(true);
          setIsLoading(false);
        };
        document.head.appendChild(script);
      }
    };

    // Check if the widget loads after a delay
    const checkWidget = () => {
      const widget = document.querySelector('.elfsight-app-9c837975-e4de-4ea7-8c68-14c70f78a160');
      if (widget && widget.children.length > 0) {
        setIsLoading(false);
        setHasError(false);
      } else {
        // Try Instagram embed as fallback
        loadInstagramScript();
        
        // If widget doesn't load after 8 seconds, show error
        setTimeout(() => {
          const widgetAfterDelay = document.querySelector('.elfsight-app-9c837975-e4de-4ea7-8c68-14c70f78a160');
          if (!widgetAfterDelay || widgetAfterDelay.children.length === 0) {
            setIsLoading(false);
            setHasError(true);
          }
        }, 8000);
      }
    };

    // Check after 3 seconds
    const timer = setTimeout(checkWidget, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="instagram" className="py-16 bg-light-beige">
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
                  <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Instagram Feed Temporarily Unavailable</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We're experiencing technical difficulties with our Instagram feed. 
                  Visit our Instagram page to see the latest updates from Valdo Americas.
                </p>
                <a 
                  href="https://www.instagram.com/valdoamericas/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
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
'use client';

import { useState, useEffect } from 'react';

interface NewsletterPopupProps {
  onClose: () => void;
}

export default function NewsletterPopup({ onClose }: NewsletterPopupProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Auto-show after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already subscribed
      const hasSubscribed = localStorage.getItem('valdo-newsletter-subscribed');
      if (!hasSubscribed) {
        // Show popup logic would go here
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Track newsletter signup
      // Analytics tracking would go here

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store subscription status
      localStorage.setItem('valdo-newsletter-subscribed', 'true');
      
      setIsSubmitted(true);
      
      // Close popup after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Track popup close
    // Analytics tracking would go here
    onClose();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 z-40">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {!isSubmitted ? (
        <>
          {/* Header */}
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h3 className="font-trajan text-xl mb-2">Join the Valdo Family</h3>
            <p className="font-raleway text-sm text-gray-600">
              Exclusive offers and Prosecco insights delivered to your inbox
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent font-raleway"
                disabled={isSubmitting}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 font-raleway">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] text-black py-3 px-6 rounded-lg font-raleway font-semibold hover:bg-[#B8941F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                'Subscribe Now'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center font-raleway">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
              Unsubscribe at any time.
            </p>
          </form>
        </>
      ) : (
        /* Success State */
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-trajan text-lg mb-2">Welcome to the Family!</h3>
          <p className="font-raleway text-sm text-gray-600">
            Thank you for subscribing. Your first Prosecco insight is on its way!
          </p>
        </div>
      )}
    </div>
  );
} 
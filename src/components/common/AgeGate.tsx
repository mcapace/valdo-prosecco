'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { imageService } from '@/services/imageServiceClient';

interface AgeGateProps {
  onAgeVerified: () => void;
}

export default function AgeGate({ onAgeVerified }: AgeGateProps) {
  const [showError, setShowError] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerified = localStorage.getItem('valdo-age-verified');
    if (hasVerified === 'true') {
      onAgeVerified();
    }
  }, [onAgeVerified]);

  const handleAgeVerification = (isOfAge: boolean) => {
    if (isOfAge) {
      localStorage.setItem('valdo-age-verified', 'true');
      onAgeVerified();
    } else {
      setShowError(true);
    }
  };

  const handleExit = () => {
    setIsExiting(true);
    // Redirect to a safe site
    window.location.href = 'https://www.google.com';
  };

  if (isExiting) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageService.getImage('Vineyards', 0)}
          alt="Valdobbiadene Vineyards"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center">
        {/* Valdo Logo */}
        <div className="mb-8">
          <Image
            src={imageService.getImage('Logos', 'valdo')}
            alt="Valdo Prosecco"
            width={120}
            height={60}
            className="mx-auto"
          />
        </div>

        <h1 className="font-trajan text-3xl md:text-4xl mb-4 text-black">
          Welcome to Valdo
        </h1>
        
        <p className="font-raleway text-gray-600 mb-8 leading-relaxed">
          You must be of legal drinking age to enter this site.
        </p>

        {showError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 font-raleway text-sm">
              You must be 21 or older to visit this site. Thank you for your understanding.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handleAgeVerification(true)}
            className="w-full bg-[#D4AF37] text-black py-4 px-6 rounded-lg font-raleway font-semibold text-lg hover:bg-[#B8941F] transition-colors"
          >
            I am 21 or older
          </button>
          
          <button
            onClick={() => handleAgeVerification(false)}
            className="w-full bg-gray-200 text-gray-700 py-4 px-6 rounded-lg font-raleway font-semibold text-lg hover:bg-gray-300 transition-colors"
          >
            I am under 21
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleExit}
            className="text-gray-500 hover:text-gray-700 font-raleway text-sm transition-colors"
          >
            Exit Site
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4 font-raleway">
          By entering this site, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('common');

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    // In a real app, you would use Next.js router to change the locale
    // For now, we'll just close the dropdown
    setIsOpen(false);
    
    // Simulate language change
    console.log(`Language changed to: ${languageCode}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#D4AF37] transition-colors font-raleway"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                language.code === locale ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-raleway">{language.name}</span>
              {language.code === locale && (
                <div className="ml-auto w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 
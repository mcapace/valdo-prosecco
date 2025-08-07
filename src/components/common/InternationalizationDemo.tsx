import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { LanguageSwitcher } from './LanguageSwitcher';

interface InternationalizationDemoProps {
  className?: string;
}

export function InternationalizationDemo({ className = '' }: InternationalizationDemoProps) {
  const t = useTranslations();
  const common = useTranslations('common');

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Internationalization Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the multilingual capabilities of our Valdo Prosecco landing page. 
          Switch between English and Italian to see the content adapt seamlessly.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Language Switcher */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Language Switcher</h3>
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Click the language switcher to change between English and Italian
            </p>
          </div>

          <div className="bg-gradient-to-br from-gold/10 to-yellow-100 p-6 rounded-xl border border-gold/20">
            <h4 className="font-trajan text-lg text-gray-900 mb-3">Current Language</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Navigation:</span>
                <p>{t('navigation.home')} • {t('navigation.about')} • {t('navigation.products')}</p>
              </div>
              <div>
                <span className="font-semibold">Common Actions:</span>
                <p>{common('learnMore')} • {common('shopNow')} • {common('viewAll')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Content Preview</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('hero.title')}</h4>
                <p className="text-sm text-gray-600">{t('hero.subtitle')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('hero.description')}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('about.title')}</h4>
                <p className="text-sm text-gray-600">{t('about.subtitle')}</p>
                <p className="text-xs text-gray-500 mt-1">{t('about.description')}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('products.title')}</h4>
                <p className="text-sm text-gray-600">{t('products.subtitle')}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-3">Translation Features</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Automatic locale detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>SEO-friendly URLs with locale prefixes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Type-safe translations with TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Pluralization and number formatting</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Date and time localization</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Usage Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12 bg-blue-50 p-6 rounded-xl border border-blue-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use Internationalization</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">In Components:</h4>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`import { useTranslations } from 'next-intl';

const t = useTranslations();
const common = useTranslations('common');

// Usage
<h1>{t('hero.title')}</h1>
<button>{common('shopNow')}</button>`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">URL Structure:</h4>
            <div className="space-y-1 text-xs">
              <p><code>/en</code> - English version</p>
              <p><code>/it</code> - Italian version</p>
              <p><code>/en/products</code> - Products in English</p>
              <p><code>/it/vineyard</code> - Vineyard in Italian</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 
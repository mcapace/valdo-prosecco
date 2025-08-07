import { useState } from 'react';
import { motion } from 'framer-motion';
import { PairingWheel } from './PairingWheel';

// Sample pairing data for different Valdo wines
const PAIRING_DATA = {
  prosecco: {
    wine: 'Valdo Prosecco',
    pairings: [
      {
        category: 'Seafood',
        score: 95,
        foods: ['Oysters', 'Shrimp', 'Lobster', 'Scallops', 'Ceviche']
      },
      {
        category: 'Cheese',
        score: 85,
        foods: ['Parmesan', 'Pecorino', 'Burrata', 'Mozzarella', 'Ricotta']
      },
      {
        category: 'Light Pasta',
        score: 90,
        foods: ['Linguine', 'Spaghetti', 'Risotto', 'Agnolotti', 'Ravioli']
      },
      {
        category: 'Fresh Fruits',
        score: 88,
        foods: ['Peaches', 'Strawberries', 'Citrus', 'Melon', 'Berries']
      },
      {
        category: 'Light Desserts',
        score: 82,
        foods: ['Tiramisu', 'Panna Cotta', 'Sorbet', 'Fruit Tarts', 'Gelato']
      },
      {
        category: 'Appetizers',
        score: 92,
        foods: ['Bruschetta', 'Caprese', 'Antipasti', 'Crostini', 'Olives']
      }
    ]
  },
  rose: {
    wine: 'Valdo Rosé',
    pairings: [
      {
        category: 'Grilled Meats',
        score: 88,
        foods: ['Chicken', 'Pork', 'Lamb', 'Duck', 'Turkey']
      },
      {
        category: 'Mediterranean',
        score: 92,
        foods: ['Greek Salad', 'Hummus', 'Falafel', 'Tzatziki', 'Dolmas']
      },
      {
        category: 'Spicy Foods',
        score: 85,
        foods: ['Thai Curry', 'Mexican', 'Indian', 'Moroccan', 'Korean']
      },
      {
        category: 'Soft Cheeses',
        score: 90,
        foods: ['Brie', 'Camembert', 'Goat Cheese', 'Feta', 'Halloumi']
      },
      {
        category: 'Berries',
        score: 87,
        foods: ['Raspberries', 'Blackberries', 'Strawberries', 'Blueberries', 'Cherries']
      },
      {
        category: 'Light Desserts',
        score: 83,
        foods: ['Cheesecake', 'Berry Tarts', 'Chocolate', 'Macarons', 'Ice Cream']
      }
    ]
  },
  brut: {
    wine: 'Valdo Brut',
    pairings: [
      {
        category: 'Rich Seafood',
        score: 90,
        foods: ['Salmon', 'Tuna', 'Sea Bass', 'Halibut', 'Cod']
      },
      {
        category: 'Aged Cheeses',
        score: 88,
        foods: ['Aged Cheddar', 'Gouda', 'Manchego', 'Gruyère', 'Comté']
      },
      {
        category: 'Creamy Pasta',
        score: 85,
        foods: ['Fettuccine Alfredo', 'Carbonara', 'Mac & Cheese', 'Lasagna', 'Ravioli']
      },
      {
        category: 'Nuts',
        score: 92,
        foods: ['Almonds', 'Pistachios', 'Walnuts', 'Pecans', 'Hazelnuts']
      },
      {
        category: 'Rich Desserts',
        score: 87,
        foods: ['Chocolate Cake', 'Crème Brûlée', 'Tiramisu', 'Cheesecake', 'Pudding']
      },
      {
        category: 'Cured Meats',
        score: 89,
        foods: ['Prosciutto', 'Salami', 'Pancetta', 'Bresaola', 'Speck']
      }
    ]
  }
};

interface PairingWheelDemoProps {
  className?: string;
}

export function PairingWheelDemo({ className = '' }: PairingWheelDemoProps) {
  const [selectedWine, setSelectedWine] = useState<keyof typeof PAIRING_DATA>('prosecco');

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Perfect Pairings Guide
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the ideal food pairings for each Valdo Prosecco variety. 
          Hover over the radar chart to explore specific categories and their perfect matches.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Wine Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Wine</h3>
            <div className="space-y-3">
              {Object.entries(PAIRING_DATA).map(([key, data]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedWine(key as keyof typeof PAIRING_DATA)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedWine === key 
                      ? 'border-gold bg-gold/10 shadow-lg' 
                      : 'border-gray-200 hover:border-gold/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-semibold text-gray-900">{data.wine}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {data.pairings.length} pairing categories
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Wine Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-gold/10 to-yellow-100 p-6 rounded-xl border border-gold/20"
          >
            <h4 className="font-trajan text-xl text-gray-900 mb-3">
              {PAIRING_DATA[selectedWine].wine}
            </h4>
            <p className="text-gray-700 mb-4">
              Explore the perfect food pairings for this exceptional Italian sparkling wine.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {PAIRING_DATA[selectedWine].pairings.length} pairing categories
              </span>
              <span className="text-gold font-semibold">
                Perfect Match
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Pairing Wheel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:col-span-2"
        >
          <PairingWheel data={PAIRING_DATA[selectedWine]} />
        </motion.div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            How to Use the Pairing Wheel
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>Hover over chart points to see pairings</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>Click to lock a category selection</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>Higher scores = better pairings</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PairingData {
  wine: string;
  pairings: {
    category: string;
    score: number;
    foods: string[];
  }[];
}

export function PairingWheel({ data }: { data: PairingData }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const chartData = {
    labels: data.pairings.map(p => p.category),
    datasets: [{
      label: data.wine,
      data: data.pairings.map(p => p.score),
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      borderColor: '#D4AF37',
      borderWidth: 2,
      pointBackgroundColor: '#D4AF37',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { 
          display: false,
          stepSize: 20,
        },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1,
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1,
        },
        pointLabels: {
          color: '#D4AF37',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
      }
    },
    plugins: {
      legend: { 
        display: false 
      },
      tooltip: {
        enabled: false, // We'll handle tooltips manually
      },
    },
    onHover: (event: any, activeElements: any[]) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        setSelectedCategory(data.pairings[index].category);
      } else {
        setSelectedCategory(null);
      }
    },
    onClick: (event: any, activeElements: any[]) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        setSelectedCategory(data.pairings[index].category);
      }
    },
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="h-96">
        <Radar
          data={chartData}
          options={chartOptions}
        />
      </div>
      
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full mt-6 left-0 right-0 bg-black/95 backdrop-blur-sm text-white p-6 rounded-xl border border-gold/20 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-trajan text-xl text-gold">{selectedCategory}</h4>
              <motion.button
                onClick={() => setSelectedCategory(null)}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-300">
                Perfect pairings for {data.wine}:
              </p>
              <div className="flex flex-wrap gap-2">
                {data.pairings
                  .find(p => p.category === selectedCategory)
                  ?.foods.map((food, index) => (
                    <motion.span
                      key={food}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    >
                      {food}
                    </motion.span>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
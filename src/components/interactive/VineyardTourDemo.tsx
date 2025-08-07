import { useState } from 'react';
import { motion } from 'framer-motion';
import { VineyardTour } from './VineyardTour';

// Sample tour points for Valdobbiadene vineyard
const TOUR_POINTS = [
  {
    id: 'glera-vines',
    name: 'Glera Grape Vines',
    description: 'Discover the heart of Prosecco production with our signature Glera grape vines, carefully cultivated in the rolling hills of Valdobbiadene. Learn about our sustainable farming practices and the unique terroir that gives our wines their distinctive character.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual video URL
    coordinates: { x: 25, y: 35 }
  },
  {
    id: 'harvesting',
    name: 'Harvesting Process',
    description: 'Experience the traditional hand-harvesting methods that have been passed down through generations. Watch our skilled workers carefully select only the finest grapes during the optimal harvest window.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual video URL
    coordinates: { x: 65, y: 45 }
  },
  {
    id: 'winery',
    name: 'Historic Winery',
    description: 'Step inside our century-old winery where tradition meets modern technology. See how we blend time-honored techniques with state-of-the-art equipment to create the perfect Prosecco.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual video URL
    coordinates: { x: 45, y: 70 }
  },
  {
    id: 'cellars',
    name: 'Aging Cellars',
    description: 'Explore our underground cellars where bottles age to perfection. Learn about our unique aging process and how we achieve the perfect balance of flavors and bubbles.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual video URL
    coordinates: { x: 80, y: 25 }
  },
  {
    id: 'tasting-room',
    name: 'Tasting Room',
    description: 'Visit our elegant tasting room where visitors can sample our finest Prosecco varieties. Experience the full range of flavors from our classic Brut to our premium vintage selections.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual video URL
    coordinates: { x: 15, y: 80 }
  },
  {
    id: 'terrace',
    name: 'Panoramic Terrace',
    description: 'Take in the breathtaking views of the Valdobbiadene hills from our panoramic terrace. This is where we host special events and private tastings with the most spectacular backdrop.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Replace with actual video URL
    coordinates: { x: 70, y: 15 }
  }
];

interface VineyardTourDemoProps {
  className?: string;
}

export function VineyardTourDemo({ className = '' }: VineyardTourDemoProps) {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Virtual Vineyard Tour
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience the magic of Valdobbiadene from anywhere in the world. 
          Click on the interactive points to explore our vineyard and winery.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Tour Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-2"
        >
          <VineyardTour tourPoints={TOUR_POINTS} />
        </motion.div>

        {/* Tour Points List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tour Locations</h3>
            <div className="space-y-3">
              {TOUR_POINTS.map((point, index) => (
                <motion.button
                  key={point.id}
                  onClick={() => setSelectedPoint(point.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedPoint === point.id 
                      ? 'border-gold bg-gold/10 shadow-lg' 
                      : 'border-gray-200 hover:border-gold/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{point.name}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tour Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-gold/10 to-yellow-100 p-6 rounded-xl border border-gold/20"
          >
            <h4 className="font-trajan text-xl text-gray-900 mb-3">
              About Our Vineyard
            </h4>
            <p className="text-gray-700 mb-4">
              Located in the heart of Valdobbiadene, our vineyard spans over 90 hectares 
              of carefully tended land, producing some of Italy's finest Prosecco.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gold">Established:</span>
                <p className="text-gray-600">1926</p>
              </div>
              <div>
                <span className="font-semibold text-gold">Size:</span>
                <p className="text-gray-600">90+ hectares</p>
              </div>
              <div>
                <span className="font-semibold text-gold">Varieties:</span>
                <p className="text-gray-600">Glera, Pinot Noir</p>
              </div>
              <div>
                <span className="font-semibold text-gold">Production:</span>
                <p className="text-gray-600">2M+ bottles/year</p>
              </div>
            </div>
          </motion.div>

          {/* Tour Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-2">How to Navigate</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Click on map points to start videos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Use the list to jump to specific locations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Full-screen videos for immersive experience</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 
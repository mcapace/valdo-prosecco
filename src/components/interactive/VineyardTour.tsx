import { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Play, X } from 'lucide-react';

interface TourPoint {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  coordinates: { x: number; y: number };
}

export function VineyardTour({ tourPoints }: { tourPoints: TourPoint[] }) {
  const [selectedPoint, setSelectedPoint] = useState<TourPoint | null>(null);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      {/* Vineyard Map Background */}
      <img
        src="/images/vineyard-map.jpg"
        alt="Valdobbiadene Vineyard Map"
        className="w-full h-full object-cover"
      />
      
      {/* Interactive Points */}
      {tourPoints.map((point) => (
        <motion.button
          key={point.id}
          className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${point.coordinates.x}%`, top: `${point.coordinates.y}%` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedPoint(point)}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-[#D4AF37] rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ opacity: 0.3 }}
            />
            <div className="relative bg-[#D4AF37] rounded-full w-full h-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-black" />
            </div>
          </div>
        </motion.button>
      ))}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl"
            >
              <button
                onClick={() => setSelectedPoint(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#D4AF37] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="bg-black rounded-lg overflow-hidden">
                <ReactPlayer
                  url={selectedPoint.videoUrl}
                  width="100%"
                  height="500px"
                  controls
                  playing
                />
                <div className="p-6">
                  <h3 className="font-trajan text-2xl text-[#D4AF37] mb-2">
                    {selectedPoint.name}
                  </h3>
                  <p className="font-raleway text-white">
                    {selectedPoint.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
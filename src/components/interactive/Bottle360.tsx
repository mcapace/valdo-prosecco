import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function BottleModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation animation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene} />
    </group>
  );
}

interface Bottle360Props {
  modelUrl: string;
  className?: string;
  autoRotate?: boolean;
  showControls?: boolean;
}

export function Bottle360({ 
  modelUrl, 
  className = '',
  autoRotate = true,
  showControls = true
}: Bottle360Props) {
  return (
    <motion.div 
      className={`w-full h-[600px] relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          <BottleModel url={modelUrl} />
          
          <ContactShadows
            opacity={0.4}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
          
          <Environment preset="studio" />
          
          <OrbitControls
            enablePan={false}
            enableZoom={showControls}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.5}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
      
      {showControls && (
        <motion.div 
          className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm font-medium">
            {autoRotate ? 'Auto-rotating • ' : ''}Drag to rotate • Scroll to zoom
          </p>
        </motion.div>
      )}
      
      {/* Loading indicator */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-white font-medium">Loading 3D Model...</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Preload function for better performance
export function preloadBottleModel(url: string) {
  useGLTF.preload(url);
} 
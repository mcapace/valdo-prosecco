import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate 5000 particles forming a wine glass shape
  const particles = useMemo(() => {
    const temp = [];
    const glassShape = (y: number) => Math.sin(y * Math.PI) * 0.5 + 0.2;
    
    for (let i = 0; i < 5000; i++) {
      const y = (Math.random() - 0.5) * 2;
      const radius = glassShape(Math.abs(y));
      const angle = Math.random() * Math.PI * 2;
      
      temp.push(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      // Floating animation
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#D4AF37"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default ParticleField; 
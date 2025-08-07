import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';

interface ParticleFieldWrapperProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ParticleFieldWrapper({ className, style }: ParticleFieldWrapperProps) {
  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
} 
import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface UseMagneticEffectProps {
  strength?: number;
  damping?: number;
  stiffness?: number;
}

export function useMagneticEffect({ 
  strength = 0.3, 
  damping = 25, 
  stiffness = 700 
}: UseMagneticEffectProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, { damping, stiffness });
  const ySpring = useSpring(y, { damping, stiffness });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, x, y]);

  return {
    ref,
    style: {
      x: xSpring,
      y: ySpring,
    },
  };
}

// Higher-order component for easy magnetic effect application
export function withMagneticEffect<P extends object>(
  Component: React.ComponentType<P>,
  options?: UseMagneticEffectProps
) {
  return function MagneticComponent(props: P) {
    const magneticProps = useMagneticEffect(options);
    
    return (
      <motion.div {...magneticProps}>
        <Component {...props} />
      </motion.div>
    );
  };
} 
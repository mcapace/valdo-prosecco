import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LiquidTextAdvancedProps {
  text: string;
  className?: string;
  variant?: 'gold' | 'champagne' | 'crystal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  waveSpeed?: number;
  liquidIntensity?: number;
}

export function LiquidTextAdvanced({ 
  text, 
  className = '', 
  variant = 'gold',
  size = 'lg',
  waveSpeed = 20,
  liquidIntensity = 1
}: LiquidTextAdvancedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const gradients = {
    gold: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #D4AF37 100%)',
    champagne: 'linear-gradient(90deg, #F4E4BC 0%, #F7E7CE 25%, #F4E4BC 50%, #F7E7CE 75%, #F4E4BC 100%)',
    crystal: 'linear-gradient(90deg, #E8F4FD 0%, #FFFFFF 25%, #E8F4FD 50%, #FFFFFF 75%, #E8F4FD 100%)'
  };

  const sizes = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-4xl lg:text-5xl',
    xl: 'text-4xl md:text-6xl lg:text-8xl'
  };

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    if (!container || !textElement) return;

    // Create liquid mask effect with wave animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
        onEnter: () => setIsVisible(true),
        onLeave: () => setIsVisible(false),
        onEnterBack: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      }
    });

    // Initial liquid reveal animation
    tl.fromTo(textElement, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      y: 100 * liquidIntensity,
      opacity: 0,
    }, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out'
    });

    // Add liquid wave effect
    gsap.to(textElement, {
      backgroundPosition: '200% center',
      duration: waveSpeed,
      repeat: -1,
      ease: 'none',
    });

    // Add subtle floating animation when visible
    if (isVisible) {
      gsap.to(textElement, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }

    return () => {
      tl.kill();
    };
  }, [isVisible, liquidIntensity, waveSpeed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={textRef}
        className={`liquid-text font-bold ${sizes[size]} transition-all duration-500`}
        style={{
          background: gradients[variant],
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: variant === 'crystal' ? 'drop-shadow(0 0 10px rgba(232, 244, 253, 0.5))' : 'none',
        }}
      >
        {text}
      </div>
      
      {/* Liquid drop effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 20% 80%, ${variant === 'gold' ? '#D4AF37' : variant === 'champagne' ? '#F4E4BC' : '#E8F4FD'} 0%, transparent 50%)`,
          animation: 'liquid-drop 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}

// CSS for liquid drop animation (add to your global CSS)
const liquidDropCSS = `
@keyframes liquid-drop {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
  50% { transform: translateY(-10px) scale(1.1); opacity: 0.4; }
}
`;

// Add the CSS to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = liquidDropCSS;
  document.head.appendChild(style);
} 
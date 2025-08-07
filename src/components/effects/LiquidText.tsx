import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function LiquidText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Create liquid mask effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      }
    });

    tl.fromTo(text, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      y: 100,
    }, {
      clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
      y: 0,
      duration: 1,
      ease: 'power4.out'
    });

    // Add liquid wave effect
    gsap.to(text, {
      backgroundPosition: '200% center',
      duration: 20,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={textRef}
        className="liquid-text"
        style={{
          background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 25%, #D4AF37 50%, #FFD700 75%, #D4AF37 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {text}
      </div>
    </div>
  );
} 
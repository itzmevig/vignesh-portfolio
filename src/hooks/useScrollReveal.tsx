
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;
    
    const defaultOptions = { 
      opacity: 0, 
      y: 50, 
      duration: 1,
      ease: "power3.out",
      stagger: 0.1
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        element, 
        { opacity: 0, y: mergedOptions.y }, 
        {
          opacity: 1, 
          y: 0, 
          duration: mergedOptions.duration,
          ease: mergedOptions.ease,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            onEnter: () => setIsRevealed(true)
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, [options]);
  
  return { elementRef, isRevealed };
}

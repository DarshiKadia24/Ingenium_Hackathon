import { useEffect, useRef } from 'react';
import { reveal } from './animeHelper';

/**
 * Hook for scroll-triggered animations
 * Animates elements when they enter the viewport
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            reveal(entry.target, {
              duration: options.duration || 1000,
              easing: options.easing || 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              delay: options.delay || 0,
            });
            hasAnimated.current = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return elementRef;
};

/**
 * Hook for parallax scroll effect
 */
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      
      if (element) {
        element.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elementRef;
};

export default { useScrollAnimation, useParallax };

import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * React Hook for Anime.js animations
 * Makes it easier to use anime.js in React components
 */
export const useAnime = (animationConfig, deps = []) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && animationConfig) {
      const config = {
        targets: elementRef.current,
        ...animationConfig,
      };
      animationRef.current = anime(config);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, deps);

  return elementRef;
};

/**
 * Hook for fade in animation
 */
export const useFadeIn = (delay = 0, duration = 600) => {
  return useAnime({
    opacity: [0, 1],
    duration,
    delay,
    easing: 'ease-out',
  });
};

/**
 * Hook for slide in animation
 */
export const useSlideIn = (direction = 'up', delay = 0, duration = 800) => {
  const translateMap = {
    up: { translateY: [50, 0] },
    down: { translateY: [-50, 0] },
    left: { translateX: [50, 0] },
    right: { translateX: [-50, 0] },
  };

  return useAnime({
    opacity: [0, 1],
    ...translateMap[direction],
    duration,
    delay,
    easing: 'ease-out',
  });
};

/**
 * Hook for scale in animation
 */
export const useScaleIn = (delay = 0, duration = 600) => {
  return useAnime({
    scale: [0.8, 1],
    opacity: [0, 1],
    duration,
    delay,
    easing: 'ease-out',
  });
};

export default useAnime;

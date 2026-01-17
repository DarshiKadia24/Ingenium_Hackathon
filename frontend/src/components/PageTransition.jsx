import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { pageTransition } from '../utils/animeHelper';

/**
 * Premium Page Transition Component
 * Smooth page transitions with fade, slide, and scale
 */
const PageTransition = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          pageTransition.enter(containerRef.current);
        }
      }, 50);
    }
    
    return () => {
      if (containerRef.current) {
        pageTransition.exit(containerRef.current);
      }
    };
  }, []);

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        width: '100%', 
        minHeight: '100vh',
        opacity: 0,
        transform: 'translateY(30px) scale(0.98)',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Box>
  );
};

export default PageTransition;

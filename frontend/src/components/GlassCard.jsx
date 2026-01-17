import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@mui/material';
import { fadeIn, cardHover } from '../utils/animeHelper';
import { glassmorphism } from '../theme';

const GlassCard = ({ children, sx = {}, ...props }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Premium entrance animation - use setTimeout to ensure DOM is ready
      setTimeout(() => {
        if (cardRef.current) {
          fadeIn(cardRef.current, { 
            duration: 800,
            delay: 0,
            easing: 'easeOutExpo',
          });
        }
      }, 50);
    }
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardHover.enter(cardRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardHover.leave(cardRef.current);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        opacity: 0,
        transform: 'translateY(20px)',
        willChange: 'transform, opacity',
      }}
    >
      <Card
        sx={{
          ...glassmorphism,
          borderRadius: 4,
          p: 0,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          ...sx,
        }}
        {...props}
      >
        <CardContent sx={{ p: 3 }}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default GlassCard;

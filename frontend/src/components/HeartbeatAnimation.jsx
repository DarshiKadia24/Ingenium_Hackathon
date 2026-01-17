import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Favorite } from '@mui/icons-material';

const HeartbeatAnimation = ({ size = 60, color = '#d32f2f' }) => {
  return (
    <Box
      component={motion.div}
      initial={{ scale: 0 }}
      animate={{ 
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Favorite
        sx={{
          fontSize: size,
          color: color,
          filter: 'drop-shadow(0 0 8px rgba(211, 47, 47, 0.5))',
        }}
      />
    </Box>
  );
};

export default HeartbeatAnimation;

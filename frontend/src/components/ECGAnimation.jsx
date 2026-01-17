import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const ECGAnimation = ({ width = 300, height = 100, color = '#0d47a1' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    let animationFrame;
    let time = 0;

    const drawECG = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = height / 2;
      const frequency = 0.05;
      const amplitude = 20;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x * frequency) + time) * amplitude;
        
        // Add ECG spikes
        if (x % 50 < 5) {
          const spikeY = centerY - 30;
          if (x === 0) {
            ctx.moveTo(x, spikeY);
          } else {
            ctx.lineTo(x, spikeY);
            ctx.lineTo(x, y);
          }
        } else {
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      }

      ctx.stroke();
      time += 0.1;
      animationFrame = requestAnimationFrame(drawECG);
    };

    drawECG();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [width, height, color]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </Box>
  );
};

export default ECGAnimation;

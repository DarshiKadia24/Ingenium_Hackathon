import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SparkleRating = ({ value, onChange, size = 30, readOnly = false }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {[1, 2, 3, 4, 5].map((index) => {
        const isFilled = index <= value;
        const isHovered = index <= hoveredIndex;
        const shouldSparkle = isFilled || isHovered;

        return (
          <motion.div
            key={index}
            onMouseEnter={() => !readOnly && setHoveredIndex(index)}
            onMouseLeave={() => !readOnly && setHoveredIndex(null)}
            onClick={() => !readOnly && onChange && onChange(index)}
            style={{ cursor: readOnly ? 'default' : 'pointer' }}
            whileHover={!readOnly ? { scale: 1.2, rotate: [0, -10, 10, -10, 0] } : {}}
            whileTap={!readOnly ? { scale: 0.9 } : {}}
          >
            <Star
              sx={{
                fontSize: size,
                color: isFilled || isHovered ? '#ffc107' : '#e0e0e0',
                filter: shouldSparkle ? 'drop-shadow(0 0 8px rgba(255, 193, 7, 0.6))' : 'none',
                transition: 'all 0.2s',
              }}
            />
          </motion.div>
        );
      })}
    </Box>
  );
};

export default SparkleRating;

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Healing as StethoscopeIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { healthcareColors } from '../theme';

const StethoscopeAnimation = ({ message = 'Assessment Complete' }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 4,
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
        }}
      >
        <StethoscopeIcon
          sx={{
            fontSize: 80,
            color: healthcareColors.primary,
            filter: 'drop-shadow(0 0 12px rgba(13, 71, 161, 0.5))',
            mb: 2,
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          {message}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your clinical skill assessment has been recorded
        </Typography>
      </motion.div>
    </Box>
  );
};

export default StethoscopeAnimation;

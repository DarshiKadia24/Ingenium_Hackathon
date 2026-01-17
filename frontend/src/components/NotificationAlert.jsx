import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { motion } from 'framer-motion';
import { healthcareColors } from '../theme';

const NotificationAlert = ({ severity = 'info', title, message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        sx={{
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            '50%': {
              boxShadow: `0 4px 20px ${healthcareColors.accent}40`,
            },
          },
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </motion.div>
  );
};

export default NotificationAlert;

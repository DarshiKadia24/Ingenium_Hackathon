import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { LocalHospital as HospitalIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { healthcareColors } from '../theme';

const MedicalSpinner = ({ size = 60 }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          color: healthcareColors.primary,
        }}
      />
      <Box
        component={motion.div}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <HospitalIcon
          sx={{
            fontSize: size * 0.4,
            color: healthcareColors.primary,
          }}
        />
      </Box>
    </Box>
  );
};

export default MedicalSpinner;

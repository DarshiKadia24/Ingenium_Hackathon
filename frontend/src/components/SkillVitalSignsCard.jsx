import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { glassmorphism, healthcareColors } from '../theme';

const VitalGauge = ({ label, value, color, size = 100 }) => {
  const normalizedValue = Math.min(value, 100);
  const statusColor =
    normalizedValue >= 80 ? '#4caf50' : normalizedValue >= 60 ? '#ff9800' : healthcareColors.accent;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
        <CircularProgress
          variant="determinate"
          value={normalizedValue}
          size={size}
          thickness={6}
          sx={{
            color: statusColor,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: statusColor }}>
            {Math.round(normalizedValue)}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: statusColor,
          fontWeight: 600,
          display: 'block',
          mt: 0.5,
        }}
      >
        {normalizedValue >= 80 ? 'Healthy' : normalizedValue >= 60 ? 'Monitor' : 'Critical'}
      </Typography>
    </Box>
  );
};

const SkillVitalSignsCard = ({ vitals = { clinical: 0, technical: 0, compliance: 0 } }) => {
  const hasData = vitals.clinical > 0 || vitals.technical > 0 || vitals.compliance > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card
        sx={{
          ...glassmorphism,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(227, 242, 253, 0.8) 0%, rgba(187, 222, 251, 0.8) 100%)',
          border: '1px solid rgba(13, 71, 161, 0.2)',
          height: '100%',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Skill Vital Signs
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 3,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <VitalGauge label="Clinical Knowledge" value={vitals.clinical} />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <VitalGauge label="Technical Skills" value={vitals.technical} />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <VitalGauge label="Compliance" value={vitals.compliance} />
            </motion.div>
          </Box>

          {hasData ? (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: 'rgba(13, 71, 161, 0.1)',
                borderRadius: 2,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                <strong>Normal Range:</strong> 80-100% | <strong>Monitor:</strong> 60-79% |{' '}
                <strong>Critical:</strong> &lt;60%
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: 'rgba(13, 71, 161, 0.05)',
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Assess your skills to see your vital signs
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillVitalSignsCard;

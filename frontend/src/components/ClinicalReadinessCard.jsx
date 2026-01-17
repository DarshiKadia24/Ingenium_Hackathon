import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { Favorite } from '@mui/icons-material';
import ECGAnimation from './ECGAnimation';
import AnimatedProgressBar from './AnimatedProgressBar';
import { glassmorphism, healthcareColors } from '../theme';

const ClinicalReadinessCard = ({ readinessScore = 0 }) => {
  const hasData = readinessScore > 0;
  const displayScore = hasData ? readinessScore : 0;
  const pulseScale = 1 + (displayScore / 100) * 0.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
              Clinical Readiness
            </Typography>
            <motion.div
              animate={{
                scale: [1, pulseScale, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Favorite
                sx={{
                  fontSize: 32,
                  color: healthcareColors.accent,
                  filter: 'drop-shadow(0 0 8px rgba(211, 47, 47, 0.5))',
                }}
              />
            </motion.div>
          </Box>

          <Box sx={{ mb: 3 }}>
            <ECGAnimation width={280} height={80} color={healthcareColors.primary} />
          </Box>

          <AnimatedProgressBar
            value={displayScore}
            label="Overall Readiness"
            color={healthcareColors.primary}
            height={12}
          />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Status:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color:
                  displayScore >= 80
                    ? '#4caf50'
                    : displayScore >= 60
                    ? '#ff9800'
                    : healthcareColors.accent,
              }}
            >
              {hasData 
                ? (displayScore >= 80
                    ? 'Excellent'
                    : displayScore >= 60
                    ? 'Good'
                    : 'Needs Improvement')
                : 'Start Assessment'}
            </Typography>
          </Box>
          
          {!hasData && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(13, 71, 161, 0.05)', borderRadius: 2 }}>
              <Typography variant="caption" color="text.secondary" align="center" display="block">
                Complete your skills assessment to see your readiness score
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClinicalReadinessCard;

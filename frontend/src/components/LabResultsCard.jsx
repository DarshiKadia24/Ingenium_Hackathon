import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Science as ScienceIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { glassmorphism, healthcareColors } from '../theme';

const LabResultItem = ({ label, yourValue, normalRange, unit, index }) => {
  const isNormal = yourValue >= normalRange.min && yourValue <= normalRange.max;
  const color = isNormal ? '#4caf50' : yourValue < normalRange.min ? '#ff9800' : healthcareColors.accent;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
    >
      <Box
        sx={{
          p: 2,
          mb: 2,
          bgcolor: 'rgba(255, 255, 255, 0.6)',
          borderRadius: 2,
          border: `2px solid ${isNormal ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 152, 0, 0.3)'}`,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: color,
              }}
            >
              {yourValue}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {unit}
            </Typography>
            {!isNormal && (
              <TrendingUpIcon sx={{ fontSize: 18, color: color }} />
            )}
          </Box>
        </Box>
        <Box sx={{ mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={Math.min((yourValue / normalRange.max) * 100, 100)}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: color,
              },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            Normal: {normalRange.min}-{normalRange.max} {unit}
          </Typography>
          <Chip
            label={isNormal ? 'Normal' : 'Abnormal'}
            size="small"
            sx={{
              bgcolor: isNormal ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
              color: isNormal ? '#4caf50' : '#ff9800',
              fontWeight: 600,
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

const LabResultsCard = ({ analytics = null }) => {
  const labResults = analytics
    ? [
        {
          label: 'Skills Mastery',
          yourValue: analytics.skillsMastery || 0,
          normalRange: { min: 70, max: 100 },
          unit: '%',
        },
        {
          label: 'Course Completion',
          yourValue: analytics.courseCompletion || 0,
          normalRange: { min: 60, max: 100 },
          unit: '%',
        },
        {
          label: 'Assessment Accuracy',
          yourValue: analytics.assessmentAccuracy || 0,
          normalRange: { min: 75, max: 100 },
          unit: '%',
        },
        {
          label: 'Learning Velocity',
          yourValue: analytics.learningVelocity || 0,
          normalRange: { min: 50, max: 100 },
          unit: 'pts/week',
        },
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ScienceIcon sx={{ fontSize: 28, color: healthcareColors.primary, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
              Lab Results
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Analytics Report
            </Typography>
          </Box>

          {labResults.length > 0 ? (
            labResults.map((result, index) => (
              <LabResultItem key={result.label} {...result} index={index} />
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No analytics data available yet.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LabResultsCard;

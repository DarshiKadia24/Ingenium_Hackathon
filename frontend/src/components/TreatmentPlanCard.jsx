import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress, CardActions, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { LocalPharmacy as PharmacyIcon, Schedule as ScheduleIcon } from '@mui/icons-material';
import { glassmorphism, healthcareColors } from '../theme';

const TreatmentItem = ({ treatment, index }) => {
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
          border: '1px solid rgba(13, 71, 161, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {treatment.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {treatment.description}
            </Typography>
          </Box>
          <Chip
            label={treatment.type}
            size="small"
            color={treatment.type === 'Course' ? 'primary' : 'secondary'}
            sx={{ ml: 1 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {treatment.dosage} hrs/week
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={treatment.progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: healthcareColors.primary,
                },
              }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {treatment.progress}%
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const TreatmentPlanCard = ({ treatments = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
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
            <PharmacyIcon sx={{ fontSize: 28, color: healthcareColors.primary, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
              Treatment Plan
            </Typography>
            <Chip label="Active" color="success" size="small" />
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
            Prescribed learning path for skill development
          </Typography>

          <AnimatePresence>
            {treatments.length > 0 ? (
              treatments.map((treatment, index) => (
                <TreatmentItem key={treatment.id || index} treatment={treatment} index={index} />
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No active treatments. Check recommendations to start.
                </Typography>
              </Box>
            )}
          </AnimatePresence>
          
          {treatments.length > 0 && (
            <CardActions sx={{ p: 2, pt: 0 }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button fullWidth variant="outlined" size="small">
                  View Full Treatment Plan
                </Button>
              </motion.div>
            </CardActions>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TreatmentPlanCard;

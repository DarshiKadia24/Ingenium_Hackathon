import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider, Button } from '@mui/material';
import {
  Assignment as ReportIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { glassmorphism, healthcareColors } from '../theme';

const SeverityIndicator = ({ severity, label }) => {
  const severityConfig = {
    mild: { color: '#ff9800', icon: <WarningIcon />, bg: '#fff3e0' },
    moderate: { color: '#f57c00', icon: <WarningIcon />, bg: '#ffe0b2' },
    severe: { color: healthcareColors.accent, icon: <ErrorIcon />, bg: '#ffebee' },
    none: { color: '#4caf50', icon: <CheckIcon />, bg: '#e8f5e9' },
  };

  const config = severityConfig[severity] || severityConfig.none;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1.5,
        borderRadius: 2,
        bgcolor: config.bg,
        border: `2px solid ${config.color}`,
      }}
    >
      <Box sx={{ color: config.color }}>{config.icon}</Box>
      <Typography variant="body2" sx={{ fontWeight: 600, color: config.color, flexGrow: 1 }}>
        {label}
      </Typography>
      <Chip
        label={severity.toUpperCase()}
        size="small"
        sx={{
          bgcolor: config.color,
          color: 'white',
          fontWeight: 600,
        }}
      />
    </Box>
  );
};

const DiagnosisReport = ({ skillGaps = [], recommendations = [] }) => {
  const calculateSeverity = (gapCount) => {
    if (gapCount === 0) return 'none';
    if (gapCount <= 2) return 'mild';
    if (gapCount <= 5) return 'moderate';
    return 'severe';
  };

  const severity = calculateSeverity(skillGaps.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          ...glassmorphism,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(227, 242, 253, 0.9) 0%, rgba(187, 222, 251, 0.9) 100%)',
          border: '2px solid rgba(13, 71, 161, 0.3)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ReportIcon sx={{ fontSize: 32, color: healthcareColors.primary, mr: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, flexGrow: 1 }}>
              Clinical Skill Diagnosis Report
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {new Date().toLocaleDateString()}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Diagnosis Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Diagnosis Summary
            </Typography>
            <SeverityIndicator
              severity={severity}
              label={
                severity === 'none'
                  ? 'No significant skill gaps detected'
                  : `${skillGaps.length} skill gap${skillGaps.length > 1 ? 's' : ''} identified`
              }
            />
          </Box>

          {/* Identified Gaps */}
          {skillGaps.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Identified Skill Gaps
              </Typography>
              {skillGaps.map((gap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: 2,
                      borderLeft: '4px solid',
                      borderColor: healthcareColors.accent,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {gap.skillName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current: {gap.currentLevel} → Required: {gap.requiredLevel}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Treatment Recommendations */}
          {recommendations.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Treatment Recommendations
              </Typography>
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: 2,
                      borderLeft: '4px solid',
                      borderColor: healthcareColors.secondary,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {rec.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {rec.description}
                        </Typography>
                      </Box>
                      <Chip
                        label={rec.type}
                        size="small"
                        color={rec.type === 'Course' ? 'primary' : 'secondary'}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    <Button size="small" variant="outlined" sx={{ mt: 1 }}>
                      Start Treatment
                    </Button>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}

          {skillGaps.length === 0 && recommendations.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckIcon sx={{ fontSize: 64, color: '#4caf50', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Excellent Clinical Readiness
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No skill gaps detected. Continue maintaining your proficiency.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DiagnosisReport;

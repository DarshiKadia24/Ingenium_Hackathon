import React from 'react';
import { Tooltip, Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

const SkillTooltip = ({ skill, children }) => {
  const medicalAnalogies = {
    'HIPAA Compliance': 'Like a medical license - essential for practice',
    'EHR Systems': 'The digital stethoscope of modern healthcare',
    'Clinical Data Analysis': 'Diagnosing patterns in patient outcomes',
    'Telemedicine Platforms': 'The virtual hospital ward',
    'Healthcare Data Security': 'The immune system protecting patient data',
    'Medical Device Integration': 'Connecting medical instruments to the digital body',
  };

  const analogy = medicalAnalogies[skill?.name] || 'A critical skill for healthcare technology';

  return (
    <Tooltip
      title={
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {skill?.name || 'Skill'}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            {analogy}
          </Typography>
          {skill?.healthcareContext && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip
                label={`Impact: ${skill.healthcareContext.patientImpact}`}
                size="small"
                sx={{ height: 20, fontSize: '0.65rem' }}
              />
              <Chip
                label={`Relevance: ${skill.healthcareContext.clinicalRelevance}`}
                size="small"
                sx={{ height: 20, fontSize: '0.65rem' }}
              />
            </Box>
          )}
        </Box>
      }
      arrow
      placement="top"
      components={{
        Tooltip: motion.div,
      }}
    >
      {children}
    </Tooltip>
  );
};

export default SkillTooltip;

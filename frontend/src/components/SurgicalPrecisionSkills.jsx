import React from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import {
  Build as ScalpelIcon,
  Science as ForcepsIcon,
  Healing as StethoscopeIcon,
  Security as ShieldIcon,
  Analytics as MonitorIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { healthcareColors } from '../theme';

const skillIconMap = {
  Clinical: <StethoscopeIcon />,
  Technical: <MonitorIcon />,
  Regulatory: <ShieldIcon />,
  Analytical: <ForcepsIcon />,
  'Soft Skills': <ScalpelIcon />,
};

const SurgicalPrecisionSkills = ({ requiredSkills = [], userSkills = [] }) => {
  const getUserSkillLevel = (skillId) => {
    const userSkill = userSkills.find((us) => us.skillId?._id === skillId || us.skillId === skillId);
    return userSkill?.proficiency?.level || null;
  };

  const getProficiencyScore = (level) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4, master: 5 };
    return levels[level?.toLowerCase()] || 0;
  };

  const getRequiredScore = (requiredLevel) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4, master: 5 };
    return levels[requiredLevel?.toLowerCase()] || 0;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Surgical Precision Requirements
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
        Required skills for this role - your current proficiency highlighted
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {requiredSkills.map((reqSkill, index) => {
          const skill = reqSkill.skillId || reqSkill;
          const skillName = skill.name || skill;
          const skillCategory = skill.category || 'Technical';
          const requiredLevel = reqSkill.requiredLevel || 'intermediate';
          const userLevel = getUserSkillLevel(skill._id || skill);
          const userScore = getProficiencyScore(userLevel);
          const requiredScore = getRequiredScore(requiredLevel);
          const isMet = userScore >= requiredScore;
          const isPartial = userScore > 0 && userScore < requiredScore;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Tooltip
                title={
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {skillName}
                    </Typography>
                    <Typography variant="caption">
                      Required: {requiredLevel} | Your Level: {userLevel || 'Not assessed'}
                    </Typography>
                  </Box>
                }
                arrow
              >
                <Box
                  sx={{
                    position: 'relative',
                    p: 2,
                    borderRadius: 3,
                    border: `3px solid ${
                      isMet ? '#4caf50' : isPartial ? '#ff9800' : healthcareColors.accent
                    }`,
                    bgcolor: isMet
                      ? 'rgba(76, 175, 80, 0.1)'
                      : isPartial
                      ? 'rgba(255, 152, 0, 0.1)'
                      : 'rgba(211, 47, 47, 0.1)',
                    minWidth: 120,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: `0 4px 12px ${
                        isMet ? '#4caf50' : isPartial ? '#ff9800' : healthcareColors.accent
                      }40`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      fontSize: 32,
                      mb: 1,
                      color: isMet ? '#4caf50' : isPartial ? '#ff9800' : healthcareColors.accent,
                    }}
                  >
                    {skillIconMap[skillCategory] || <ScalpelIcon />}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      display: 'block',
                      mb: 0.5,
                      fontSize: '0.75rem',
                    }}
                  >
                    {skillName.length > 15 ? skillName.substring(0, 15) + '...' : skillName}
                  </Typography>
                  <Chip
                    label={requiredLevel}
                    size="small"
                    sx={{
                      bgcolor: isMet ? '#4caf50' : isPartial ? '#ff9800' : healthcareColors.accent,
                      color: 'white',
                      fontWeight: 600,
                      height: 20,
                      fontSize: '0.65rem',
                    }}
                  />
                  {userLevel && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: isMet ? '#4caf50' : '#ff9800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {userScore}
                    </Box>
                  )}
                  {!isMet && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: healthcareColors.accent,
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                          '50%': { opacity: 0.5, transform: 'scale(1.5)' },
                        },
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
            </motion.div>
          );
        })}
      </Box>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(13, 71, 161, 0.05)', borderRadius: 2 }}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: '#4caf50',
            }}
          />
          Met Requirement
        </Typography>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: '#ff9800',
            }}
          />
          Partial Progress
        </Typography>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: healthcareColors.accent,
            }}
          />
          Needs Operation (Missing)
        </Typography>
      </Box>
    </Box>
  );
};

export default SurgicalPrecisionSkills;

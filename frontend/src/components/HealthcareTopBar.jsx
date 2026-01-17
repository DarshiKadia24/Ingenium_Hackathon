import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Chip, IconButton } from '@mui/material';
import { Notifications as NotificationsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { healthcareColors } from '../theme';
import { drawerWidth } from './HealthcareSidebar';

const HealthcareTopBar = ({ user, onLogout }) => {
  const getRoleBadge = (specialization) => {
    const roleMap = {
      'Health Informatics': { label: 'Clinical Informaticist', color: 'primary' },
      'Clinical Data': { label: 'Data Analyst', color: 'secondary' },
      'Telemedicine': { label: 'Telemedicine Specialist', color: 'info' },
      'Medical Devices': { label: 'Device Engineer', color: 'warning' },
      'Healthcare Cybersecurity': { label: 'Security Analyst', color: 'error' },
    };
    return roleMap[specialization] || { label: 'Healthcare Professional', color: 'default' };
  };

  const roleBadge = user?.healthcareSpecialization
    ? getRoleBadge(user.healthcareSpecialization)
    : { label: 'Healthcare Professional', color: 'default' };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: 'white',
        color: 'text.primary',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins' }}>
            Healthcare Intelligence Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={roleBadge.label}
            color={roleBadge.color}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              sx={{
                bgcolor: 'rgba(13, 71, 161, 0.1)',
                '&:hover': { bgcolor: 'rgba(13, 71, 161, 0.2)' },
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </motion.div>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: healthcareColors.primary,
                width: 40,
                height: 40,
              }}
            >
              {user?.firstName?.[0] || user?.email?.[0] || 'U'}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton onClick={onLogout} color="error">
              <LogoutIcon />
            </IconButton>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HealthcareTopBar;

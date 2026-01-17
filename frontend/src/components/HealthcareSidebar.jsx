import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Work as WorkIcon,
  Recommend as RecommendIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { healthcareColors } from '../theme';
import { scaleIn, stagger } from '../utils/animeHelper';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Skills Assessment', icon: <AssessmentIcon />, path: '/skills' },
  { text: 'Gap Analysis', icon: <AnalyticsIcon />, path: '/gap-analysis' },
  { text: 'Career Paths', icon: <WorkIcon />, path: '/career-paths' },
  { text: 'Recommendations', icon: <RecommendIcon />, path: '/recommendations' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
];

const HealthcareSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoRef = useRef(null);
  const menuItemsRef = useRef([]);

  useEffect(() => {
    if (logoRef.current) {
      setTimeout(() => {
        if (logoRef.current) {
          scaleIn(logoRef.current, { 
            duration: 700,
            easing: 'easeOutExpo',
          });
        }
      }, 50);
    }
  }, []);

  useEffect(() => {
    if (menuItemsRef.current.length > 0) {
      const validRefs = menuItemsRef.current.filter(ref => ref !== null && ref !== undefined);
      if (validRefs.length > 0) {
        setTimeout(() => {
          stagger(validRefs, { 
            staggerDelay: 100,
            duration: 600,
            easing: 'easeOutExpo',
          });
        }, 100);
      }
    }
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: `linear-gradient(180deg, ${healthcareColors.primary} 0%, ${healthcareColors.dark} 100%)`,
          color: 'white',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box 
          ref={logoRef} 
          sx={{ 
            opacity: 0,
            transform: 'scale(0)',
            willChange: 'transform, opacity',
          }}
        >
          <HospitalIcon sx={{ fontSize: 48, mb: 1 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Poppins' }}>
          Healthcare Intelligence
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Skill Platform
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      <List sx={{ pt: 2 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ 
                mb: 0.5, 
                px: 2,
                opacity: 0,
                transform: 'translateX(-30px)',
                willChange: 'transform, opacity',
              }}
              ref={el => {
                if (el && el.nodeType === 1) menuItemsRef.current[index] = el;
              }}
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateX(8px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isActive ? 'translateX(5px)' : 'translateX(0)',
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9375rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default HealthcareSidebar;
export { drawerWidth };

import { createTheme } from '@mui/material/styles';

// Premium Healthcare Design System Colors
export const healthcareColors = {
  primary: '#0d47a1', // Deep Blue
  secondary: '#00897b', // Medical Teal
  accent: '#d32f2f', // Alert Red
  background: '#fafafa', // Hospital White
  cardGradient: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
  light: '#e3f2fd',
  dark: '#1565c0',
};

// Healthcare specialty colors
export const specialtyColors = {
  'Health Informatics': '#0d47a1',
  'Medical Devices': '#00897b',
  'Telemedicine': '#03a9f4',
  'Clinical Data': '#0277bd',
  'Healthcare Cybersecurity': '#01579b',
  'General': '#0d47a1',
};

// Helper function to get specialty color
export const getSpecialtyColor = (specialty) => {
  return specialtyColors[specialty] || healthcareColors.primary;
};

// Helper function to get specialty background color
export const getSpecialtyBgColor = (specialty) => {
  return healthcareColors.light;
};

// Glassmorphism styles
export const glassmorphism = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

// Create premium theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: healthcareColors.primary,
      light: '#1976d2',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      main: healthcareColors.secondary,
      light: '#4db6ac',
      dark: '#00695c',
      contrastText: '#fff',
    },
    error: {
      main: healthcareColors.accent,
      light: '#ef5350',
      dark: '#c62828',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: healthcareColors.background,
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    code: {
      fontFamily: 'Roboto Mono, monospace',
      fontSize: '0.875rem',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '12px 28px',
          fontWeight: 600,
          fontSize: '0.9375rem',
          boxShadow: '0 4px 12px rgba(13, 71, 161, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(13, 71, 161, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: healthcareColors.primary,
            },
          },
        },
      },
    },
  },
});

export default theme;

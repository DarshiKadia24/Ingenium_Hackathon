import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  MedicalServices as MedicalIcon,
  HealthAndSafety as HealthIcon,
  Healing as HealingIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  const specialties = [
    {
      name: 'Health Informatics',
      icon: <MedicalIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      description: 'Master health information systems, EHR management, and healthcare data analytics.',
      color: '#e3f2fd',
    },
    {
      name: 'Medical Devices',
      icon: <HealthIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      description: 'Develop expertise in medical device technology, regulation, and innovation.',
      color: '#e3f2fd',
    },
    {
      name: 'Telemedicine',
      icon: <HealingIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      description: 'Learn remote healthcare delivery, telemedicine platforms, and virtual care solutions.',
      color: '#e3f2fd',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              }}
            >
              Healthcare Technology Skill Intelligence Platform
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              Track your healthcare technology skills, discover career paths, and achieve your professional goals
              in Health Informatics, Medical Devices, Telemedicine, Clinical Data, and Healthcare Cybersecurity.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              {isAuthenticated ? (
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                      },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.8)',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Healthcare Specialty Cards Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Explore Healthcare Specialties
        </Typography>
        <Grid container spacing={4}>
          {specialties.map((specialty, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                  border: `2px solid ${specialty.color}`,
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    pt: 4,
                    pb: 2,
                    bgcolor: specialty.color,
                  }}
                >
                  <Box sx={{ mb: 2 }}>{specialty.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {specialty.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {specialty.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button
                    component={Link}
                    to={isAuthenticated ? '/dashboard' : '/register'}
                    variant="outlined"
                    size="medium"
                  >
                    Explore {specialty.name}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: theme.palette.grey[100],
          py: { xs: 6, md: 8 },
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Ready to Transform Your Healthcare Career?
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Join thousands of healthcare professionals tracking their technology skills and advancing their careers
              in healthcare informatics, medical devices, telemedicine, and more.
            </Typography>
            {!isAuthenticated && (
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Start Your Journey Today
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;

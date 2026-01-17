import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { Code as CodeIcon, Add as AddIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { glassmorphism, healthcareColors } from '../theme';

const RecentProjectsCard = ({ projects, totalProjects }) => {
  const navigate = useNavigate();
  const recentProjects = projects.slice(0, 3);

  return (
    <Card sx={{ height: '100%', ...glassmorphism, borderRadius: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CodeIcon sx={{ fontSize: 32, color: healthcareColors.primary, mr: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: healthcareColors.primary }}>
              Projects ({totalProjects})
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate('/profile')}
            sx={{ borderColor: healthcareColors.primary, color: healthcareColors.primary }}
          >
            Add
          </Button>
        </Box>

        {recentProjects.length > 0 ? (
          <Box>
            {recentProjects.map((project) => (
              <Box
                key={project._id}
                sx={{
                  mb: 2,
                  p: 2,
                  bgcolor: 'rgba(0,0,0,0.02)',
                  borderRadius: 2,
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'rgba(13, 71, 161, 0.05)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {project.title}
                </Typography>
                {project.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {project.description.length > 80
                      ? `${project.description.substring(0, 80)}...`
                      : project.description}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  <Chip label={project.status} size="small" />
                  {project.healthcareDomain && (
                    <Chip
                      label={project.healthcareDomain}
                      size="small"
                      sx={{ bgcolor: healthcareColors.secondary, color: 'white' }}
                    />
                  )}
                  {project.projectType && (
                    <Chip label={project.projectType} size="small" variant="outlined" />
                  )}
                </Box>
              </Box>
            ))}
            {totalProjects > 3 && (
              <Button
                fullWidth
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/profile')}
                sx={{ mt: 1, color: healthcareColors.primary }}
              >
                View All Projects
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              No projects yet. Start showcasing your work!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/profile')}
              sx={{ bgcolor: healthcareColors.primary }}
            >
              Add Your First Project
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentProjectsCard;

import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress, Button } from '@mui/material';
import { TrendingUp as TrendingUpIcon, Add as AddIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { glassmorphism, healthcareColors } from '../theme';

const LearningActivityCard = ({ activities, totalHours }) => {
  const navigate = useNavigate();
  const recentActivities = activities.slice(0, 4);

  return (
    <Card sx={{ height: '100%', ...glassmorphism, borderRadius: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon sx={{ fontSize: 32, color: healthcareColors.primary, mr: 1.5 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: healthcareColors.primary }}>
                Learning Activities
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {totalHours} hours logged
              </Typography>
            </Box>
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

        {recentActivities.length > 0 ? (
          <Box>
            {recentActivities.map((activity) => (
              <Box
                key={activity._id}
                sx={{
                  mb: 2,
                  p: 1.5,
                  bgcolor: 'rgba(0,0,0,0.02)',
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: 'rgba(13, 71, 161, 0.05)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {activity.title}
                  </Typography>
                  <Chip
                    label={activity.status}
                    size="small"
                    sx={{
                      bgcolor:
                        activity.status === 'Completed'
                          ? '#4caf50'
                          : activity.status === 'In Progress'
                          ? '#2196f3'
                          : '#ff9800',
                      color: 'white',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  <Chip label={activity.activityType} size="small" variant="outlined" />
                  {activity.source && (
                    <Chip label={activity.source} size="small" variant="outlined" />
                  )}
                </Box>
                {activity.progress > 0 && (
                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={activity.progress}
                      sx={{ height: 6, borderRadius: 3, mb: 0.5 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {activity.progress}% Complete
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
            {activities.length > 4 && (
              <Button
                fullWidth
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/profile')}
                sx={{ mt: 1, color: healthcareColors.primary }}
              >
                View All Activities
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Start tracking your learning journey!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/profile')}
              sx={{ bgcolor: healthcareColors.primary }}
            >
              Add Learning Activity
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningActivityCard;

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Tabs, Tab, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Assignment as AssignmentIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { glassmorphism, healthcareColors } from '../theme';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

const ProgressNote = ({ note, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Box
        sx={{
          p: 2,
          mb: 1.5,
          bgcolor: 'rgba(255, 255, 255, 0.6)',
          borderRadius: 2,
          borderLeft: '4px solid',
          borderColor: note.status === 'completed' ? '#4caf50' : healthcareColors.primary,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 18,
              color: note.status === 'completed' ? '#4caf50' : 'text.secondary',
              mr: 1,
            }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, flexGrow: 1 }}>
            {note.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {note.date}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {note.description}
        </Typography>
      </Box>
    </motion.div>
  );
};

const PatientCaseCard = ({ activeProject = null }) => {
  const [tabValue, setTabValue] = useState(0);

  const progressNotes = activeProject
    ? [
        {
          title: 'Project Initiated',
          description: 'Started work on ' + activeProject.title,
          date: '2 days ago',
          status: 'completed',
        },
        {
          title: 'Requirements Analysis',
          description: 'Completed requirements gathering phase',
          date: '1 day ago',
          status: 'completed',
        },
        {
          title: 'Implementation Phase',
          description: 'Currently in development phase',
          date: 'Today',
          status: 'in-progress',
        },
      ]
    : [];

  const vitals = activeProject
    ? {
        progress: activeProject.progress || 0,
        health: activeProject.progress >= 70 ? 'Good' : activeProject.progress >= 40 ? 'Fair' : 'Poor',
        timeline: 'On Track',
      }
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AssignmentIcon sx={{ fontSize: 28, color: healthcareColors.primary, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
              Patient Case
            </Typography>
            {activeProject && (
              <Chip
                label={vitals?.health}
                size="small"
                color={vitals?.health === 'Good' ? 'success' : vitals?.health === 'Fair' ? 'warning' : 'error'}
              />
            )}
          </Box>

          {activeProject ? (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {activeProject.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {activeProject.description}
              </Typography>

              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="Progress Notes" />
                <Tab label="Vitals" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                {progressNotes.map((note, index) => (
                  <ProgressNote key={index} note={note} index={index} />
                ))}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255, 255, 255, 0.6)', borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: healthcareColors.primary }}>
                      {vitals?.progress}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255, 255, 255, 0.6)', borderRadius: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color:
                          vitals?.health === 'Good'
                            ? '#4caf50'
                            : vitals?.health === 'Fair'
                            ? '#ff9800'
                            : healthcareColors.accent,
                      }}
                    >
                      {vitals?.health}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Health
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'rgba(255, 255, 255, 0.6)', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: healthcareColors.secondary }}>
                      {vitals?.timeline}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Timeline
                    </Typography>
                  </Box>
                </Box>
              </TabPanel>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No active project. Start a new project from recommendations.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PatientCaseCard;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const skillRoutes = require('./routes/skills');
const userSkillRoutes = require('./routes/userSkills');
const courseRoutes = require('./routes/courses');
const careerPathRoutes = require('./routes/careerPaths');
const recommendationRoutes = require('./routes/recommendations');
const progressRoutes = require('./routes/progress');
const analysisRoutes = require('./routes/analysis');
const githubRoutes = require('./routes/github');
const academicRoutes = require('./routes/academic');
const projectRoutes = require('./routes/projects');
const learningActivityRoutes = require('./routes/learningActivities');

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Skill Intelligence Platform API is running!' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/user-skills', userSkillRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/career-paths', careerPathRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/learning-activities', learningActivityRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/skill-intelligence';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

module.exports = app;

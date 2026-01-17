const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// @route   GET /api/projects/:userId
// @desc    Get user's projects
// @access  Private
router.get('/:userId', auth, getUserProjects);

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', auth, createProject);

// @route   PUT /api/projects/:projectId
// @desc    Update a project
// @access  Private
router.put('/:projectId', auth, updateProject);

// @route   DELETE /api/projects/:projectId
// @desc    Delete a project
// @access  Private
router.delete('/:projectId', auth, deleteProject);

module.exports = router;

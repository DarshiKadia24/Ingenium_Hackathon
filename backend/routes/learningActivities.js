const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getUserLearningActivities,
  createLearningActivity,
  updateLearningActivity,
  deleteLearningActivity,
} = require('../controllers/learningActivityController');

// @route   GET /api/learning-activities/:userId
// @desc    Get user's learning activities
// @access  Private
router.get('/:userId', auth, getUserLearningActivities);

// @route   POST /api/learning-activities
// @desc    Create a new learning activity
// @access  Private
router.post('/', auth, createLearningActivity);

// @route   PUT /api/learning-activities/:activityId
// @desc    Update a learning activity
// @access  Private
router.put('/:activityId', auth, updateLearningActivity);

// @route   DELETE /api/learning-activities/:activityId
// @desc    Delete a learning activity
// @access  Private
router.delete('/:activityId', auth, deleteLearningActivity);

module.exports = router;

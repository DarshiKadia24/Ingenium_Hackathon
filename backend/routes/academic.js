const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAcademicPerformance,
  updateAcademicPerformance,
  addCourse,
} = require('../controllers/academicController');

// @route   GET /api/academic/:userId
// @desc    Get user's academic performance
// @access  Private
router.get('/:userId', auth, getAcademicPerformance);

// @route   POST /api/academic/:userId
// @desc    Update academic performance
// @access  Private
router.post('/:userId', auth, updateAcademicPerformance);

// @route   POST /api/academic/:userId/courses
// @desc    Add a course
// @access  Private
router.post('/:userId/courses', auth, addCourse);

module.exports = router;

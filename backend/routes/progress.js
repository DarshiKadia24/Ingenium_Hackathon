const express = require('express');
const router = express.Router();
const {
  getUserProgress,
  updateProgress,
} = require('../controllers/progressController');

// GET /api/progress/:userId - Get user progress overview
router.get('/:userId', getUserProgress);

// POST /api/progress/update - Update user progress
router.post('/update', updateProgress);

module.exports = router;

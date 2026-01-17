const express = require('express');
const router = express.Router();
const {
  getUserById,
  updateUser,
  getUserProgress,
} = require('../controllers/userController');

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

// PUT /api/users/:id - Update user
router.put('/:id', updateUser);

// GET /api/users/:id/progress - Get user progress
router.get('/:id/progress', getUserProgress);

module.exports = router;

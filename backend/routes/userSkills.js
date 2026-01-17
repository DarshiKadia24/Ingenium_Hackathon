const express = require('express');
const router = express.Router();
const {
  getAllUserSkills,
  getUserSkillById,
  createUserSkill,
  updateUserSkill,
  deleteUserSkill,
} = require('../controllers/userSkillController');

// GET /api/user-skills - Get all user skills
router.get('/', getAllUserSkills);

// GET /api/user-skills/:id - Get user skill by ID
router.get('/:id', getUserSkillById);

// POST /api/user-skills - Create a new user skill
router.post('/', createUserSkill);

// PUT /api/user-skills/:id - Update a user skill
router.put('/:id', updateUserSkill);

// DELETE /api/user-skills/:id - Delete a user skill
router.delete('/:id', deleteUserSkill);

module.exports = router;

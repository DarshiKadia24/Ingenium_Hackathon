const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillsBySpecialty,
  rateSkill,
  getUserSkills,
} = require('../controllers/skillController');

// GET /api/skills - Get all skills
router.get('/', getAllSkills);

// GET /api/skills/specialty/:specialty - Get skills by healthcare specialty (must come before /:id)
router.get('/specialty/:specialty', getSkillsBySpecialty);

// GET /api/skills/user/:userId - Get user's skills (must come before /:id)
router.get('/user/:userId', getUserSkills);

// POST /api/skills/rate - Rate a skill (must come before /:id)
router.post('/rate', rateSkill);

// POST /api/skills - Create a new skill
router.post('/', createSkill);

// GET /api/skills/:id - Get skill by ID
router.get('/:id', getSkillById);

// PUT /api/skills/:id - Update a skill
router.put('/:id', updateSkill);

// DELETE /api/skills/:id - Delete a skill
router.delete('/:id', deleteSkill);

module.exports = router;

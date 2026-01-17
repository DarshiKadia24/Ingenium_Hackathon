const UserSkill = require('../models/UserSkill');
const Skill = require('../models/Skill');

// @route   GET /api/user-skills
// @desc    Get all user skills (optionally filtered by userId)
// @access  Public (can be protected later)
const getAllUserSkills = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;

    const userSkills = await UserSkill.find(filter)
      .populate('userId', 'email firstName lastName')
      .populate('skillId', 'name category sector')
      .sort({ createdAt: -1 });

    res.json({ count: userSkills.length, userSkills });
  } catch (error) {
    console.error('Get all user skills error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/user-skills/:id
// @desc    Get user skill by ID
// @access  Public (can be protected later)
const getUserSkillById = async (req, res) => {
  try {
    const userSkill = await UserSkill.findById(req.params.id)
      .populate('userId', 'email firstName lastName')
      .populate('skillId', 'name category sector');

    if (!userSkill) {
      return res.status(404).json({ message: 'User skill not found' });
    }
    res.json({ userSkill });
  } catch (error) {
    console.error('Get user skill by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user skill ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/user-skills
// @desc    Create a new user skill
// @access  Public (can be protected later)
const createUserSkill = async (req, res) => {
  try {
    const { userId, skillId, proficiency, evidence, goal } = req.body;

    if (!userId || !skillId || !proficiency || !proficiency.level) {
      return res.status(400).json({ message: 'UserId, skillId, and proficiency level are required' });
    }

    // Verify skill exists
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const userSkill = new UserSkill({
      userId,
      skillId,
      proficiency: {
        level: proficiency.level,
        score: proficiency.score || 0,
      },
      evidence: evidence || [],
      goal: goal || {},
    });

    await userSkill.save();
    const populated = await UserSkill.findById(userSkill._id)
      .populate('userId', 'email firstName lastName')
      .populate('skillId', 'name category sector');

    res.status(201).json({ message: 'User skill created successfully', userSkill: populated });
  } catch (error) {
    console.error('Create user skill error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User skill already exists for this user and skill combination' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/user-skills/:id
// @desc    Update a user skill
// @access  Public (can be protected later)
const updateUserSkill = async (req, res) => {
  try {
    const { proficiency, evidence, goal } = req.body;

    const userSkill = await UserSkill.findById(req.params.id);
    if (!userSkill) {
      return res.status(404).json({ message: 'User skill not found' });
    }

    if (proficiency) {
      if (proficiency.level) userSkill.proficiency.level = proficiency.level;
      if (proficiency.score !== undefined) userSkill.proficiency.score = proficiency.score;
    }
    if (evidence) userSkill.evidence = evidence;
    if (goal) {
      if (goal.targetLevel) userSkill.goal.targetLevel = goal.targetLevel;
      if (goal.targetDate) userSkill.goal.targetDate = goal.targetDate;
    }

    await userSkill.save();
    const populated = await UserSkill.findById(userSkill._id)
      .populate('userId', 'email firstName lastName')
      .populate('skillId', 'name category sector');

    res.json({ message: 'User skill updated successfully', userSkill: populated });
  } catch (error) {
    console.error('Update user skill error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user skill ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/user-skills/:id
// @desc    Delete a user skill
// @access  Public (can be protected later)
const deleteUserSkill = async (req, res) => {
  try {
    const userSkill = await UserSkill.findByIdAndDelete(req.params.id);
    if (!userSkill) {
      return res.status(404).json({ message: 'User skill not found' });
    }
    res.json({ message: 'User skill deleted successfully' });
  } catch (error) {
    console.error('Delete user skill error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user skill ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllUserSkills,
  getUserSkillById,
  createUserSkill,
  updateUserSkill,
  deleteUserSkill,
};

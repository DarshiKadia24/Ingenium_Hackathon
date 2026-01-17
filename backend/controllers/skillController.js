const Skill = require('../models/Skill');
const UserSkill = require('../models/UserSkill');

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
const getAllSkills = async (req, res) => {
  try {
    const { category, specialty } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (specialty) filter['healthcareContext.specialty'] = specialty;

    const skills = await Skill.find(filter).sort({ name: 1 });
    res.json({ count: skills.length, skills });
  } catch (error) {
    console.error('Get all skills error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/skills/:id
// @desc    Get skill by ID
// @access  Public
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ skill });
  } catch (error) {
    console.error('Get skill by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid skill ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/skills
// @desc    Create a new skill
// @access  Public (can be protected later)
const createSkill = async (req, res) => {
  try {
    const { name, description, category, healthcareContext, proficiencyLevels } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required' });
    }

    const skill = new Skill({
      name,
      description,
      category,
      healthcareContext: healthcareContext || {},
      proficiencyLevels: proficiencyLevels || [],
    });

    await skill.save();
    res.status(201).json({ message: 'Skill created successfully', skill });
  } catch (error) {
    console.error('Create skill error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Skill with this name already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/skills/:id
// @desc    Update a skill
// @access  Public (can be protected later)
const updateSkill = async (req, res) => {
  try {
    const { name, description, category, healthcareContext, proficiencyLevels } = req.body;

    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    if (name) skill.name = name;
    if (description !== undefined) skill.description = description;
    if (category) skill.category = category;
    if (healthcareContext) skill.healthcareContext = healthcareContext;
    if (proficiencyLevels) skill.proficiencyLevels = proficiencyLevels;

    await skill.save();
    res.json({ message: 'Skill updated successfully', skill });
  } catch (error) {
    console.error('Update skill error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid skill ID' });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Skill with this name already exists' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
// @access  Public (can be protected later)
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid skill ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/skills/specialty/:specialty
// @desc    Get skills by healthcare specialty
// @access  Public
const getSkillsBySpecialty = async (req, res) => {
  try {
    const { specialty } = req.params;

    const skills = await Skill.find({ 'healthcareContext.specialty': specialty }).sort({ name: 1 });
    res.json({ count: skills.length, specialty, skills });
  } catch (error) {
    console.error('Get skills by specialty error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/skills/rate
// @desc    Rate a skill (create or update UserSkill)
// @access  Public (can be protected later)
const rateSkill = async (req, res) => {
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

    // Check if UserSkill already exists
    let userSkill = await UserSkill.findOne({ userId, skillId });

    if (userSkill) {
      // Update existing UserSkill
      if (proficiency) {
        userSkill.proficiency.level = proficiency.level;
        if (proficiency.score !== undefined) userSkill.proficiency.score = proficiency.score;
      }
      if (evidence) userSkill.evidence = evidence;
      if (goal) {
        if (goal.targetLevel) userSkill.goal.targetLevel = goal.targetLevel;
        if (goal.targetDate) userSkill.goal.targetDate = goal.targetDate;
      }
      await userSkill.save();
    } else {
      // Create new UserSkill
      userSkill = new UserSkill({
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
    }

    const populated = await UserSkill.findById(userSkill._id)
      .populate('userId', 'email firstName lastName')
      .populate('skillId', 'name category sector');

    res.json({ message: 'Skill rated successfully', userSkill: populated });
  } catch (error) {
    console.error('Rate skill error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/skills/user/:userId
// @desc    Get user's skills
// @access  Public (can be protected later)
const getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params;

    const userSkills = await UserSkill.find({ userId })
      .populate('skillId', 'name description category sector proficiencyLevels')
      .sort({ createdAt: -1 });

    res.json({ count: userSkills.length, userId, userSkills });
  } catch (error) {
    console.error('Get user skills error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillsBySpecialty,
  rateSkill,
  getUserSkills,
};

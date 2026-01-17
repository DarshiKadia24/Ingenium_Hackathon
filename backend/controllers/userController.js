const User = require('../models/User');
const UserSkill = require('../models/UserSkill');

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public (can be protected later)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Public (can be protected later)
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, role, healthcareSpecialization, healthcareCareerGoal, healthcareCertifications } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (role) user.role = role;
    if (healthcareSpecialization) user.healthcareSpecialization = healthcareSpecialization;
    if (healthcareCareerGoal !== undefined) user.healthcareCareerGoal = healthcareCareerGoal;
    if (healthcareCertifications) user.healthcareCertifications = healthcareCertifications;

    await user.save();
    const userResponse = user.toJSON(); // This will remove password

    res.json({ message: 'User updated successfully', user: userResponse });
  } catch (error) {
    console.error('Update user error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/users/:id/progress
// @desc    Get user progress
// @access  Public (can be protected later)
const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all user skills with populated skill details
    const userSkills = await UserSkill.find({ userId })
      .populate('skillId', 'name category healthcareContext proficiencyLevels')
      .sort({ createdAt: -1 });

    // Calculate progress statistics
    const totalSkills = userSkills.length;
    const skillsByCategory = {};
    const skillsBySpecialty = {};
    let totalScore = 0;
    let skillsWithGoals = 0;
    let goalsCompleted = 0;

    userSkills.forEach((userSkill) => {
      const skill = userSkill.skillId;
      if (skill) {
        // Count by category
        const category = skill.category || 'uncategorized';
        skillsByCategory[category] = (skillsByCategory[category] || 0) + 1;

        // Count by healthcare specialty
        const specialty = skill.healthcareContext?.specialty || 'General';
        skillsBySpecialty[specialty] = (skillsBySpecialty[specialty] || 0) + 1;
      }

      // Calculate scores
      if (userSkill.proficiency && userSkill.proficiency.score) {
        totalScore += userSkill.proficiency.score;
      }

      // Check goals
      if (userSkill.goal && userSkill.goal.targetLevel) {
        skillsWithGoals++;
        if (
          userSkill.goal.targetDate &&
          new Date(userSkill.goal.targetDate) < new Date() &&
          userSkill.proficiency &&
          userSkill.proficiency.level === userSkill.goal.targetLevel
        ) {
          goalsCompleted++;
        }
      }
    });

    const averageScore = totalSkills > 0 ? (totalScore / totalSkills).toFixed(2) : 0;

    res.json({
      userId,
      totalSkills,
      averageScore: parseFloat(averageScore),
      skillsByCategory,
      skillsBySpecialty,
      goals: {
        total: skillsWithGoals,
        completed: goalsCompleted,
        pending: skillsWithGoals - goalsCompleted,
      },
      userSkills,
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserById,
  updateUser,
  getUserProgress,
};

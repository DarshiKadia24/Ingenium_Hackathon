const User = require('../models/User');
const UserSkill = require('../models/UserSkill');
const Skill = require('../models/Skill');

// @route   GET /api/progress/:userId
// @desc    Get user progress overview
// @access  Public (can be protected later)
const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all user skills with populated skill details
    const userSkills = await UserSkill.find({ userId })
      .populate('skillId', 'name category healthcareContext proficiencyLevels')
      .sort({ createdAt: -1 });

    // Calculate comprehensive progress statistics
    const totalSkills = userSkills.length;
    const skillsByCategory = {};
    const skillsBySpecialty = {};
    const skillsByLevel = {};
    let totalScore = 0;
    let skillsWithGoals = 0;
    let goalsCompleted = 0;
    let goalsOverdue = 0;
    const recentActivity = [];

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

      // Count by proficiency level
      if (userSkill.proficiency && userSkill.proficiency.level) {
        const level = userSkill.proficiency.level;
        skillsByLevel[level] = (skillsByLevel[level] || 0) + 1;
      }

      // Calculate scores
      if (userSkill.proficiency && userSkill.proficiency.score) {
        totalScore += userSkill.proficiency.score;
      }

      // Check goals
      if (userSkill.goal && userSkill.goal.targetLevel) {
        skillsWithGoals++;
        const targetDate = userSkill.goal.targetDate;
        const currentLevel = userSkill.proficiency?.level;

        if (targetDate) {
          if (new Date(targetDate) < new Date()) {
            if (currentLevel === userSkill.goal.targetLevel) {
              goalsCompleted++;
            } else {
              goalsOverdue++;
            }
          }
        } else if (currentLevel === userSkill.goal.targetLevel) {
          goalsCompleted++;
        }
      }

      // Track recent activity (evidence added)
      if (userSkill.evidence && userSkill.evidence.length > 0) {
        const latestEvidence = userSkill.evidence
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        recentActivity.push({
          skillId: skill?._id,
          skillName: skill?.name,
          type: latestEvidence.type,
          date: latestEvidence.date,
        });
      }
    });

    const averageScore = totalSkills > 0 ? (totalScore / totalSkills).toFixed(2) : 0;
    const completionRate = skillsWithGoals > 0 ? ((goalsCompleted / skillsWithGoals) * 100).toFixed(2) : 0;

    // Sort recent activity by date
    recentActivity.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      userId,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        healthcareSpecialization: user.healthcareSpecialization,
        healthcareCareerGoal: user.healthcareCareerGoal,
      },
      progress: {
        totalSkills,
        averageScore: parseFloat(averageScore),
        skillsByCategory,
        skillsBySpecialty,
        skillsByLevel,
        goals: {
          total: skillsWithGoals,
          completed: goalsCompleted,
          pending: skillsWithGoals - goalsCompleted - goalsOverdue,
          overdue: goalsOverdue,
          completionRate: parseFloat(completionRate),
        },
        recentActivity: recentActivity.slice(0, 10),
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

// @route   POST /api/progress/update
// @desc    Update user progress (add evidence, update proficiency, etc.)
// @access  Public (can be protected later)
const updateProgress = async (req, res) => {
  try {
    const { userId, skillId, proficiency, evidence, goal } = req.body;

    if (!userId || !skillId) {
      return res.status(400).json({ message: 'UserId and skillId are required' });
    }

    // Verify user and skill exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Find or create UserSkill
    let userSkill = await UserSkill.findOne({ userId, skillId });

    if (!userSkill) {
      // Create new UserSkill
      userSkill = new UserSkill({
        userId,
        skillId,
        proficiency: proficiency || { level: 'beginner', score: 0 },
        evidence: [],
        goal: {},
      });
    }

    // Update proficiency if provided
    if (proficiency) {
      if (proficiency.level) userSkill.proficiency.level = proficiency.level;
      if (proficiency.score !== undefined) {
        userSkill.proficiency.score = Math.max(0, Math.min(100, proficiency.score));
      }
    }

    // Add evidence if provided
    if (evidence) {
      if (Array.isArray(evidence)) {
        // If array, add all items
        userSkill.evidence.push(...evidence.map(ev => ({
          type: ev.type,
          itemId: ev.itemId,
          date: ev.date || new Date(),
        })));
      } else {
        // If single object, add it
        userSkill.evidence.push({
          type: evidence.type,
          itemId: evidence.itemId,
          date: evidence.date || new Date(),
        });
      }
    }

    // Update goal if provided
    if (goal) {
      if (goal.targetLevel) userSkill.goal.targetLevel = goal.targetLevel;
      if (goal.targetDate) userSkill.goal.targetDate = goal.targetDate;
    }

    await userSkill.save();

    const populated = await UserSkill.findById(userSkill._id)
      .populate('userId', 'email firstName lastName')
      .populate('skillId', 'name category sector');

    res.json({
      message: 'Progress updated successfully',
      userSkill: populated,
    });
  } catch (error) {
    console.error('Update progress error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserProgress,
  updateProgress,
};

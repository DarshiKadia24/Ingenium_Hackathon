const mongoose = require('mongoose');

const userSkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Skill ID is required'],
    },
    proficiency: {
      level: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },
    evidence: [
      {
        type: {
          type: String,
          required: true,
        },
        itemId: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    goal: {
      targetLevel: {
        type: String,
      },
      targetDate: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one UserSkill per user-skill combination
userSkillSchema.index({ userId: 1, skillId: 1 }, { unique: true });

const UserSkill = mongoose.model('UserSkill', userSkillSchema);

module.exports = UserSkill;

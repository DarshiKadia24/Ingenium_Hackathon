const mongoose = require('mongoose');

const healthcareStandardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Standard name is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ['HIPAA Compliance', 'FDA Regulations', 'Clinical Trials', 'Data Standards', 'Quality Assurance'],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      enum: ['Basic', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Basic',
    },
    requirements: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
      },
    ],
    relatedSkills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    resources: [
      {
        title: String,
        url: String,
        type: {
          type: String,
          enum: ['Documentation', 'Training', 'Certification', 'Guideline'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HealthcareStandard = mongoose.model('HealthcareStandard', healthcareStandardSchema);

module.exports = HealthcareStandard;

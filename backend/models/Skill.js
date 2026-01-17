const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Clinical', 'Technical', 'Regulatory', 'Analytical', 'Soft Skills'],
      required: [true, 'Category is required'],
    },
    healthcareContext: {
      specialty: {
        type: String,
        trim: true,
      },
      importance: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      clinicalRelevance: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium',
      },
      patientImpact: {
        type: String,
        enum: ['Indirect', 'Moderate', 'Direct', 'Life-Critical'],
        default: 'Moderate',
      },
      regulatoryImportance: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      evidenceExamples: [
        {
          type: {
            type: String,
            enum: ['Case Study', 'Clinical Trial', 'Patient Data Project', 'Research Paper', 'Certification', 'Project'],
          },
          title: String,
          description: String,
          url: String,
        },
      ],
    },
    proficiencyLevels: [
      {
        level: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;

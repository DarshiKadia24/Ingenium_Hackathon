const mongoose = require('mongoose');

const careerPathSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Career path title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    healthcareSpecialty: {
      type: String,
      enum: ['Health Informatics', 'Medical Devices', 'Telemedicine', 'Clinical Data', 'Healthcare Cybersecurity', 'General'],
      default: 'General',
    },
    requiredSkills: [
      {
        skillId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill',
          required: true,
        },
        requiredLevel: {
          type: String,
          required: true,
        },
      },
    ],
    salaryRange: {
      min: {
        type: Number,
        min: 0,
      },
      max: {
        type: Number,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const CareerPath = mongoose.model('CareerPath', careerPathSchema);

module.exports = CareerPath;

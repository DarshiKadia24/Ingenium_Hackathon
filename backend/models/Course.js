const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    provider: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please provide a valid URL'],
    },
    healthcareSpecialty: {
      type: String,
      enum: ['Health Informatics', 'Medical Devices', 'Telemedicine', 'Clinical Data', 'Healthcare Cybersecurity', 'General'],
      default: 'General',
    },
    skillsCovered: [
      {
        type: String,
        trim: true,
      },
    ],
    duration: {
      type: String, // e.g., "4 weeks", "40 hours"
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    cost: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

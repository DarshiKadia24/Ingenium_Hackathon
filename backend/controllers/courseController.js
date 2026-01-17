const Course = require('../models/Course');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const { healthcareSpecialty, difficulty } = req.query;
    const filter = {};

    if (healthcareSpecialty) filter.healthcareSpecialty = healthcareSpecialty;
    if (difficulty) filter.difficulty = difficulty;

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json({ count: courses.length, courses });
  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ course });
  } catch (error) {
    console.error('Get course by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/courses
// @desc    Create a new course
// @access  Public (can be protected later)
const createCourse = async (req, res) => {
  try {
    const { title, description, provider, url, healthcareSpecialty, skillsCovered, duration, difficulty, cost } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const course = new Course({
      title,
      description,
      provider,
      url,
      healthcareSpecialty: healthcareSpecialty || 'General',
      skillsCovered: skillsCovered || [],
      duration,
      difficulty: difficulty || 'beginner',
      cost: cost || 0,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Create course error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Public (can be protected later)
const updateCourse = async (req, res) => {
  try {
    const { title, description, provider, url, healthcareSpecialty, skillsCovered, duration, difficulty, cost } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (title) course.title = title;
    if (description !== undefined) course.description = description;
    if (provider !== undefined) course.provider = provider;
    if (url !== undefined) course.url = url;
    if (healthcareSpecialty) course.healthcareSpecialty = healthcareSpecialty;
    if (skillsCovered) course.skillsCovered = skillsCovered;
    if (duration !== undefined) course.duration = duration;
    if (difficulty) course.difficulty = difficulty;
    if (cost !== undefined) course.cost = cost;

    await course.save();
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    console.error('Update course error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Public (can be protected later)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid course ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};

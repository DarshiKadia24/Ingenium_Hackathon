const AcademicPerformance = require('../models/AcademicPerformance');
const User = require('../models/User');

// @route   GET /api/academic/:userId
// @desc    Get user's academic performance
// @access  Private
const getAcademicPerformance = async (req, res) => {
  try {
    const { userId } = req.params;

    let academic = await AcademicPerformance.findOne({ userId }).populate('courses.skillsGained', 'name category');

    if (!academic) {
      // Create empty academic record
      academic = new AcademicPerformance({ userId });
      await academic.save();
    }

    // Calculate GPA if courses exist
    if (academic.courses && academic.courses.length > 0) {
      const gpaData = academic.calculateGPA();
      academic.cumulativeGPA = gpaData.cumulativeGPA;
      academic.currentGPA = gpaData.currentGPA;
      await academic.save();
    }

    res.json(academic);
  } catch (error) {
    console.error('Error fetching academic performance:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/academic/:userId
// @desc    Create or update academic performance
// @access  Private
const updateAcademicPerformance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { courses, achievements, cumulativeGPA, currentGPA } = req.body;

    let academic = await AcademicPerformance.findOne({ userId });

    if (!academic) {
      academic = new AcademicPerformance({ userId });
    }

    if (courses) {
      academic.courses = courses;
    }

    if (achievements) {
      academic.achievements = achievements;
    }

    if (cumulativeGPA !== undefined) {
      academic.cumulativeGPA = cumulativeGPA;
    }

    if (currentGPA !== undefined) {
      academic.currentGPA = currentGPA;
    }

    // Recalculate GPA if courses are provided
    if (courses && courses.length > 0) {
      const gpaData = academic.calculateGPA();
      academic.cumulativeGPA = gpaData.cumulativeGPA;
      academic.currentGPA = gpaData.currentGPA;
    }

    await academic.save();

    res.json(academic);
  } catch (error) {
    console.error('Error updating academic performance:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/academic/:userId/courses
// @desc    Add a course to academic performance
// @access  Private
const addCourse = async (req, res) => {
  try {
    const { userId } = req.params;
    const courseData = req.body;

    let academic = await AcademicPerformance.findOne({ userId });

    if (!academic) {
      academic = new AcademicPerformance({ userId });
    }

    academic.courses.push(courseData);

    // Recalculate GPA
    const gpaData = academic.calculateGPA();
    academic.cumulativeGPA = gpaData.cumulativeGPA;
    academic.currentGPA = gpaData.currentGPA;

    await academic.save();

    res.json(academic);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAcademicPerformance,
  updateAcademicPerformance,
  addCourse,
};

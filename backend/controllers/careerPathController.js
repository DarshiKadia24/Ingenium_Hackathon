const CareerPath = require('../models/CareerPath');
const Skill = require('../models/Skill');

// @route   GET /api/career-paths
// @desc    Get all career paths
// @access  Public
const getAllCareerPaths = async (req, res) => {
  try {
    const { healthcareSpecialty } = req.query;
    const filter = {};

    if (healthcareSpecialty) filter.healthcareSpecialty = healthcareSpecialty;

    const careerPaths = await CareerPath.find(filter)
      .populate('requiredSkills.skillId', 'name category healthcareContext')
      .sort({ createdAt: -1 });

    res.json({ count: careerPaths.length, careerPaths });
  } catch (error) {
    console.error('Get all career paths error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/career-paths/:id
// @desc    Get career path by ID
// @access  Public
const getCareerPathById = async (req, res) => {
  try {
    const careerPath = await CareerPath.findById(req.params.id)
      .populate('requiredSkills.skillId', 'name category healthcareContext');

    if (!careerPath) {
      return res.status(404).json({ message: 'Career path not found' });
    }
    res.json({ careerPath });
  } catch (error) {
    console.error('Get career path by ID error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid career path ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/career-paths
// @desc    Create a new career path
// @access  Public (can be protected later)
const createCareerPath = async (req, res) => {
  try {
    const { title, description, healthcareSpecialty, requiredSkills, salaryRange } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Verify all skill IDs exist
    if (requiredSkills && requiredSkills.length > 0) {
      for (const reqSkill of requiredSkills) {
        if (reqSkill.skillId) {
          const skill = await Skill.findById(reqSkill.skillId);
          if (!skill) {
            return res.status(404).json({ message: `Skill with ID ${reqSkill.skillId} not found` });
          }
        }
      }
    }

    const careerPath = new CareerPath({
      title,
      description,
      healthcareSpecialty: healthcareSpecialty || 'General',
      requiredSkills: requiredSkills || [],
      salaryRange: salaryRange || {},
    });

    await careerPath.save();
    const populated = await CareerPath.findById(careerPath._id)
      .populate('requiredSkills.skillId', 'name category healthcareContext');

    res.status(201).json({ message: 'Career path created successfully', careerPath: populated });
  } catch (error) {
    console.error('Create career path error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/career-paths/:id
// @desc    Update a career path
// @access  Public (can be protected later)
const updateCareerPath = async (req, res) => {
  try {
    const { title, description, healthcareSpecialty, requiredSkills, salaryRange } = req.body;

    const careerPath = await CareerPath.findById(req.params.id);
    if (!careerPath) {
      return res.status(404).json({ message: 'Career path not found' });
    }

    // Verify all skill IDs exist if requiredSkills is being updated
    if (requiredSkills && requiredSkills.length > 0) {
      for (const reqSkill of requiredSkills) {
        if (reqSkill.skillId) {
          const skill = await Skill.findById(reqSkill.skillId);
          if (!skill) {
            return res.status(404).json({ message: `Skill with ID ${reqSkill.skillId} not found` });
          }
        }
      }
    }

    if (title) careerPath.title = title;
    if (description !== undefined) careerPath.description = description;
    if (healthcareSpecialty) careerPath.healthcareSpecialty = healthcareSpecialty;
    if (requiredSkills) careerPath.requiredSkills = requiredSkills;
    if (salaryRange) {
      if (salaryRange.min !== undefined) careerPath.salaryRange.min = salaryRange.min;
      if (salaryRange.max !== undefined) careerPath.salaryRange.max = salaryRange.max;
    }

    await careerPath.save();
    const populated = await CareerPath.findById(careerPath._id)
      .populate('requiredSkills.skillId', 'name category healthcareContext');

    res.json({ message: 'Career path updated successfully', careerPath: populated });
  } catch (error) {
    console.error('Update career path error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid career path ID' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/career-paths/:id
// @desc    Delete a career path
// @access  Public (can be protected later)
const deleteCareerPath = async (req, res) => {
  try {
    const careerPath = await CareerPath.findByIdAndDelete(req.params.id);
    if (!careerPath) {
      return res.status(404).json({ message: 'Career path not found' });
    }
    res.json({ message: 'Career path deleted successfully' });
  } catch (error) {
    console.error('Delete career path error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid career path ID' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllCareerPaths,
  getCareerPathById,
  createCareerPath,
  updateCareerPath,
  deleteCareerPath,
};

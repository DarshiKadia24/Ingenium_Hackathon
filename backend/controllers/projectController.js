const Project = require('../models/Project');
const User = require('../models/User');

// @route   GET /api/projects/:userId
// @desc    Get user's projects
// @access  Private
const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, healthcareDomain } = req.query;

    const query = { userId };
    if (status) query.status = status;
    if (healthcareDomain) query.healthcareDomain = healthcareDomain;

    const projects = await Project.find(query)
      .populate('skillsUsed.skillId', 'name category healthcareContext')
      .sort({ createdAt: -1 });

    res.json({ projects, count: projects.length });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    const project = new Project(projectData);
    await project.save();

    const populatedProject = await Project.findById(project._id)
      .populate('skillsUsed.skillId', 'name category healthcareContext');

    res.status(201).json(populatedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/projects/:projectId
// @desc    Update a project
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true, runValidators: true }
    ).populate('skillsUsed.skillId', 'name category healthcareContext');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/projects/:projectId
// @desc    Delete a project
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserProjects,
  createProject,
  updateProject,
  deleteProject,
};

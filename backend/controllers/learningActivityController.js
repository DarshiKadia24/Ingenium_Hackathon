const LearningActivity = require('../models/LearningActivity');
const User = require('../models/User');

// @route   GET /api/learning-activities/:userId
// @desc    Get user's learning activities
// @access  Private
const getUserLearningActivities = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, activityType, limit = 50 } = req.query;

    const query = { userId };
    if (status) query.status = status;
    if (activityType) query.activityType = activityType;

    const activities = await LearningActivity.find(query)
      .populate('skillsLearned.skillId', 'name category healthcareContext')
      .populate('relatedCourseId', 'title provider')
      .populate('relatedProjectId', 'title')
      .sort({ dateStarted: -1 })
      .limit(parseInt(limit));

    // Calculate total learning time
    const totalHours = activities.reduce((sum, activity) => {
      return sum + (activity.getTotalTime ? activity.getTotalTime() : 0);
    }, 0);

    res.json({
      activities,
      count: activities.length,
      totalHours: parseFloat(totalHours.toFixed(2)),
    });
  } catch (error) {
    console.error('Error fetching learning activities:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/learning-activities
// @desc    Create a new learning activity
// @access  Private
const createLearningActivity = async (req, res) => {
  try {
    const activityData = req.body;

    const activity = new LearningActivity(activityData);
    await activity.save();

    const populatedActivity = await LearningActivity.findById(activity._id)
      .populate('skillsLearned.skillId', 'name category healthcareContext')
      .populate('relatedCourseId', 'title provider')
      .populate('relatedProjectId', 'title');

    res.status(201).json(populatedActivity);
  } catch (error) {
    console.error('Error creating learning activity:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/learning-activities/:activityId
// @desc    Update a learning activity
// @access  Private
const updateLearningActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const updateData = req.body;

    // If progress is 100, mark as completed
    if (updateData.progress === 100 && updateData.status !== 'Completed') {
      updateData.status = 'Completed';
      if (!updateData.dateCompleted) {
        updateData.dateCompleted = new Date();
      }
    }

    const activity = await LearningActivity.findByIdAndUpdate(
      activityId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('skillsLearned.skillId', 'name category healthcareContext')
      .populate('relatedCourseId', 'title provider')
      .populate('relatedProjectId', 'title');

    if (!activity) {
      return res.status(404).json({ message: 'Learning activity not found' });
    }

    res.json(activity);
  } catch (error) {
    console.error('Error updating learning activity:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/learning-activities/:activityId
// @desc    Delete a learning activity
// @access  Private
const deleteLearningActivity = async (req, res) => {
  try {
    const { activityId } = req.params;

    const activity = await LearningActivity.findByIdAndDelete(activityId);

    if (!activity) {
      return res.status(404).json({ message: 'Learning activity not found' });
    }

    res.json({ message: 'Learning activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting learning activity:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUserLearningActivities,
  createLearningActivity,
  updateLearningActivity,
  deleteLearningActivity,
};

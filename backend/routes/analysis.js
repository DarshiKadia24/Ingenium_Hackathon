const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SkillGapAnalyzer = require('../utils/skillGapAnalyzer');
const CourseRecommender = require('../utils/courseRecommender');
const LearningPathGenerator = require('../utils/learningPathGenerator');

/**
 * @route   POST /api/analysis/gap
 * @desc    Analyze skill gaps for user and target role
 * @access  Private
 */
router.post('/gap', auth, async (req, res) => {
  try {
    const { targetRoleId } = req.body;
    const userId = req.user.id || req.user._id || req.user._id.toString();

    if (!targetRoleId) {
      return res.status(400).json({ error: 'targetRoleId is required' });
    }

    const analyzer = new SkillGapAnalyzer(userId.toString(), targetRoleId);
    const analysis = await analyzer.analyzeGaps();

    res.json(analysis);
  } catch (error) {
    console.error('Error in gap analysis:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message 
    });
  }
});

/**
 * @route   POST /api/analysis/recommendations
 * @desc    Get personalized course recommendations based on skill gaps
 * @access  Private
 */
router.post('/recommendations', auth, async (req, res) => {
  try {
    const { targetRoleId } = req.body;
    const userId = req.user.id || req.user._id || req.user._id.toString();

    if (!targetRoleId) {
      return res.status(400).json({ error: 'targetRoleId is required' });
    }

    // First analyze gaps
    const analyzer = new SkillGapAnalyzer(userId.toString(), targetRoleId);
    const analysis = await analyzer.analyzeGaps();

    // Then get recommendations based on gaps
    const recommender = new CourseRecommender(userId.toString(), analysis.gaps);
    const recommendations = await recommender.getPersonalizedRecommendations();

    res.json({
      analysis: analysis,
      recommendations: recommendations
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ 
      error: 'Recommendation failed', 
      message: error.message 
    });
  }
});

/**
 * @route   POST /api/analysis/learning-path
 * @desc    Generate complete learning path with timeline
 * @access  Private
 */
router.post('/learning-path', auth, async (req, res) => {
  try {
    const { targetRoleId, timeline } = req.body;
    const userId = req.user.id || req.user._id || req.user._id.toString();

    if (!targetRoleId) {
      return res.status(400).json({ error: 'targetRoleId is required' });
    }

    const generator = new LearningPathGenerator(
      userId.toString(), 
      targetRoleId, 
      timeline || 'balanced'
    );
    const learningPath = await generator.generate();

    res.json(learningPath);
  } catch (error) {
    console.error('Error generating learning path:', error);
    res.status(500).json({ 
      error: 'Learning path generation failed', 
      message: error.message 
    });
  }
});

module.exports = router;

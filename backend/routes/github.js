const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const GitHubAPI = require('../utils/githubAPI');
const SkillGapAnalyzer = require('../utils/skillGapAnalyzer');

const githubAPI = new GitHubAPI();

/**
 * @route   GET /api/github/projects
 * @desc    Get healthcare project recommendations from GitHub
 * @access  Private
 */
router.get('/projects', auth, async (req, res) => {
  try {
    const { query, language, limit } = req.query;
    
    const options = {
      query: query || 'healthcare',
      language: language || 'javascript',
      perPage: parseInt(limit) || 10,
    };

    const repos = await githubAPI.searchHealthcareRepos(options);
    res.json({ projects: repos });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    res.status(500).json({
      error: 'Failed to fetch projects',
      message: error.message,
    });
  }
});

/**
 * @route   POST /api/github/recommendations
 * @desc    Get personalized project recommendations based on skill gaps
 * @access  Private
 */
router.post('/recommendations', auth, async (req, res) => {
  try {
    const { targetRoleId } = req.body;
    const userId = req.user.id || req.user._id;

    if (!targetRoleId) {
      return res.status(400).json({ error: 'targetRoleId is required' });
    }

    // Analyze skill gaps first
    const analyzer = new SkillGapAnalyzer(userId, targetRoleId);
    const analysis = await analyzer.analyzeGaps();

    // Get project recommendations based on gaps
    const projects = await githubAPI.getProjectRecommendations(analysis.gaps);

    res.json({
      skillGaps: analysis.gaps.length,
      projects: projects,
      summary: {
        totalProjects: projects.length,
        highRelevance: projects.filter(p => p.healthcareRelevance === 'high').length,
        mediumRelevance: projects.filter(p => p.healthcareRelevance === 'medium').length,
      },
    });
  } catch (error) {
    console.error('Error getting project recommendations:', error);
    res.status(500).json({
      error: 'Failed to get project recommendations',
      message: error.message,
    });
  }
});

module.exports = router;

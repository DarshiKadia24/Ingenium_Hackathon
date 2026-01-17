/**
 * Recommendation Engine
 * Provides hardcoded recommendations based on user profile and sector
 */

/**
 * Get recommendations for a user based on their sector
 * @param {String} userId - User ID
 * @param {String} sector - Sector (healthcare, agriculture, urban)
 * @returns {Array} - Array of recommendation objects
 */
function getRecommendations(userId, sector = 'multiple') {
  const recommendations = [];

  // Sector-specific recommendations
  const sectorRecommendations = {
    healthcare: [
      {
        type: 'course',
        title: 'Introduction to Healthcare Management',
        description: 'Learn the fundamentals of healthcare administration and management',
        url: 'https://example.com/courses/healthcare-management',
        provider: 'Healthcare Academy',
        difficulty: 'beginner',
        duration: '4 weeks',
      },
      {
        type: 'course',
        title: 'Medical Terminology Essentials',
        description: 'Master medical terminology for effective communication in healthcare',
        url: 'https://example.com/courses/medical-terminology',
        provider: 'Medical Education Hub',
        difficulty: 'beginner',
        duration: '6 weeks',
      },
      {
        type: 'project',
        title: 'Build a Patient Management System',
        description: 'Create a web application for managing patient records',
        url: 'https://example.com/projects/patient-management',
        skills: ['JavaScript', 'Database Design', 'API Development'],
      },
    ],
    agriculture: [
      {
        type: 'course',
        title: 'Sustainable Agriculture Practices',
        description: 'Learn modern sustainable farming techniques and technologies',
        url: 'https://example.com/courses/sustainable-agriculture',
        provider: 'AgriTech Institute',
        difficulty: 'intermediate',
        duration: '8 weeks',
      },
      {
        type: 'course',
        title: 'Agricultural Data Analysis',
        description: 'Use data science to improve crop yields and farm efficiency',
        url: 'https://example.com/courses/agri-data-analysis',
        provider: 'DataFarm Academy',
        difficulty: 'intermediate',
        duration: '6 weeks',
      },
      {
        type: 'project',
        title: 'Smart Irrigation System',
        description: 'Design an IoT-based irrigation system for optimal water usage',
        url: 'https://example.com/projects/smart-irrigation',
        skills: ['IoT', 'Sensor Integration', 'Data Analysis'],
      },
    ],
    urban: [
      {
        type: 'course',
        title: 'Urban Planning Fundamentals',
        description: 'Introduction to urban planning principles and practices',
        url: 'https://example.com/courses/urban-planning',
        provider: 'Urban Development Institute',
        difficulty: 'beginner',
        duration: '5 weeks',
      },
      {
        type: 'course',
        title: 'Smart City Technologies',
        description: 'Explore technologies for building sustainable smart cities',
        url: 'https://example.com/courses/smart-cities',
        provider: 'TechCity Academy',
        difficulty: 'advanced',
        duration: '10 weeks',
      },
      {
        type: 'project',
        title: 'Traffic Management Dashboard',
        description: 'Create a dashboard for monitoring and managing urban traffic',
        url: 'https://example.com/projects/traffic-dashboard',
        skills: ['Data Visualization', 'Real-time Systems', 'Urban Analytics'],
      },
    ],
    multiple: [
      {
        type: 'course',
        title: 'Cross-Sector Skills Development',
        description: 'Build skills applicable across multiple sectors',
        url: 'https://example.com/courses/cross-sector',
        provider: 'Skills Academy',
        difficulty: 'beginner',
        duration: '6 weeks',
      },
      {
        type: 'course',
        title: 'Project Management Essentials',
        description: 'Learn fundamental project management skills',
        url: 'https://example.com/courses/project-management',
        provider: 'PM Institute',
        difficulty: 'intermediate',
        duration: '8 weeks',
      },
    ],
  };

  // Get sector-specific recommendations
  const sectorRecs = sectorRecommendations[sector] || sectorRecommendations.multiple;
  recommendations.push(...sectorRecs);

  // Add general recommendations
  recommendations.push(
    {
      type: 'course',
      title: 'Communication Skills Mastery',
      description: 'Improve your communication skills for professional success',
      url: 'https://example.com/courses/communication',
      provider: 'Soft Skills Academy',
      difficulty: 'beginner',
      duration: '4 weeks',
    },
    {
      type: 'course',
      title: 'Digital Literacy Fundamentals',
      description: 'Essential digital skills for the modern workplace',
      url: 'https://example.com/courses/digital-literacy',
      provider: 'Tech Basics',
      difficulty: 'beginner',
      duration: '3 weeks',
    }
  );

  return recommendations;
}

/**
 * Get skill-specific recommendations
 * @param {String} skillName - Name of the skill
 * @returns {Array} - Array of recommendations for that skill
 */
function getSkillRecommendations(skillName) {
  const skillRecs = {
    'JavaScript': [
      {
        type: 'course',
        title: 'JavaScript Fundamentals',
        description: 'Master the basics of JavaScript programming',
        url: 'https://example.com/courses/js-fundamentals',
        provider: 'Code Academy',
      },
    ],
    'Python': [
      {
        type: 'course',
        title: 'Python for Beginners',
        description: 'Learn Python programming from scratch',
        url: 'https://example.com/courses/python-basics',
        provider: 'Python Institute',
      },
    ],
  };

  return skillRecs[skillName] || [
    {
      type: 'course',
      title: `Learn ${skillName}`,
      description: `Comprehensive course on ${skillName}`,
      url: `https://example.com/courses/${skillName.toLowerCase()}`,
      provider: 'Skills Platform',
    },
  ];
}

/**
 * Get recommendations based on user's current skill level
 * @param {String} userId - User ID
 * @param {String} skillLevel - Current skill level (beginner, intermediate, advanced)
 * @param {String} sector - Sector
 * @returns {Array} - Filtered recommendations
 */
function getLevelBasedRecommendations(userId, skillLevel, sector) {
  const allRecs = getRecommendations(userId, sector);
  
  // Filter by difficulty level
  return allRecs.filter(rec => {
    if (skillLevel === 'beginner') {
      return rec.difficulty === 'beginner' || !rec.difficulty;
    } else if (skillLevel === 'intermediate') {
      return rec.difficulty !== 'advanced';
    } else {
      return true; // Advanced users can access all
    }
  });
}

module.exports = {
  getRecommendations,
  getSkillRecommendations,
  getLevelBasedRecommendations,
};

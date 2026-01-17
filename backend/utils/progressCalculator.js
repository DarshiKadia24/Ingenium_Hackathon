/**
 * Progress Calculator
 * Calculates user progress across different dimensions
 */

/**
 * Calculate overall progress for a user
 * @param {String} userId - User ID
 * @param {Array} userSkills - Array of user's skills with proficiency data
 * @returns {Object} - Progress metrics
 */
function calculateProgress(userId, userSkills = []) {
  // Mock calculation - in real implementation, this would query the database
  const totalSkills = userSkills.length;
  
  // Calculate overall progress based on proficiency scores
  let totalScore = 0;
  let skillsWithScores = 0;

  userSkills.forEach(userSkill => {
    if (userSkill.proficiency && userSkill.proficiency.score !== undefined) {
      totalScore += userSkill.proficiency.score;
      skillsWithScores++;
    }
  });

  const overall = skillsWithScores > 0 
    ? Math.round(totalScore / skillsWithScores) 
    : 0;

  // Calculate progress by sector (mock data for now)
  const bySector = {
    healthcare: calculateSectorProgress(userSkills, 'healthcare'),
    agriculture: calculateSectorProgress(userSkills, 'agriculture'),
    urban: calculateSectorProgress(userSkills, 'urban'),
  };

  // Calculate progress by category
  const byCategory = {
    technical: calculateCategoryProgress(userSkills, 'technical'),
    soft: calculateCategoryProgress(userSkills, 'soft'),
    domain: calculateCategoryProgress(userSkills, 'domain'),
    tool: calculateCategoryProgress(userSkills, 'tool'),
  };

  // Calculate goals progress
  let goalsTotal = 0;
  let goalsCompleted = 0;

  userSkills.forEach(userSkill => {
    if (userSkill.goal && userSkill.goal.targetLevel) {
      goalsTotal++;
      if (
        userSkill.proficiency &&
        userSkill.proficiency.level === userSkill.goal.targetLevel
      ) {
        goalsCompleted++;
      }
    }
  });

  const goalsProgress = goalsTotal > 0 
    ? Math.round((goalsCompleted / goalsTotal) * 100) 
    : 0;

  return {
    userId,
    overall,
    bySector,
    byCategory,
    goals: {
      total: goalsTotal,
      completed: goalsCompleted,
      progress: goalsProgress,
    },
    stats: {
      totalSkills,
      skillsWithScores,
      averageScore: overall,
    },
  };
}

/**
 * Calculate progress for a specific sector
 * @param {Array} userSkills - User skills array
 * @param {String} sector - Sector name
 * @returns {Number} - Progress percentage (0-100)
 */
function calculateSectorProgress(userSkills, sector) {
  // Filter skills by sector
  const sectorSkills = userSkills.filter(us => {
    const skill = us.skillId;
    if (skill && typeof skill === 'object') {
      return skill.sector === sector;
    }
    return false;
  });

  if (sectorSkills.length === 0) {
    // Return mock progress if no skills in this sector
    return Math.floor(Math.random() * 30) + 20; // 20-50% mock
  }

  let totalScore = 0;
  let count = 0;

  sectorSkills.forEach(us => {
    if (us.proficiency && us.proficiency.score !== undefined) {
      totalScore += us.proficiency.score;
      count++;
    }
  });

  return count > 0 ? Math.round(totalScore / count) : 0;
}

/**
 * Calculate progress for a specific category
 * @param {Array} userSkills - User skills array
 * @param {String} category - Category name
 * @returns {Number} - Progress percentage (0-100)
 */
function calculateCategoryProgress(userSkills, category) {
  // Filter skills by category
  const categorySkills = userSkills.filter(us => {
    const skill = us.skillId;
    if (skill && typeof skill === 'object') {
      return skill.category === category;
    }
    return false;
  });

  if (categorySkills.length === 0) {
    // Return mock progress if no skills in this category
    return Math.floor(Math.random() * 40) + 30; // 30-70% mock
  }

  let totalScore = 0;
  let count = 0;

  categorySkills.forEach(us => {
    if (us.proficiency && us.proficiency.score !== undefined) {
      totalScore += us.proficiency.score;
      count++;
    }
  });

  return count > 0 ? Math.round(totalScore / count) : 0;
}

/**
 * Calculate progress trend over time (mock implementation)
 * @param {String} userId - User ID
 * @param {Number} days - Number of days to look back
 * @returns {Array} - Array of progress points
 */
function calculateProgressTrend(userId, days = 30) {
  // Mock trend data
  const trend = [];
  const baseProgress = 50;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Simulate gradual progress increase
    const progress = baseProgress + (days - i) * 0.5 + Math.random() * 5;
    
    trend.push({
      date: date.toISOString().split('T')[0],
      progress: Math.min(100, Math.round(progress)),
    });
  }

  return trend;
}

/**
 * Get progress summary with all metrics
 * @param {String} userId - User ID
 * @param {Array} userSkills - User skills array
 * @returns {Object} - Comprehensive progress summary
 */
function getProgressSummary(userId, userSkills) {
  const progress = calculateProgress(userId, userSkills);
  const trend = calculateProgressTrend(userId, 30);

  return {
    ...progress,
    trend,
    lastUpdated: new Date().toISOString(),
  };
}

module.exports = {
  calculateProgress,
  calculateSectorProgress,
  calculateCategoryProgress,
  calculateProgressTrend,
  getProgressSummary,
};

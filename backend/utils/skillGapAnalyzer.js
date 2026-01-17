const UserSkill = require('../models/UserSkill');
const CareerPath = require('../models/CareerPath');
const Skill = require('../models/Skill');

/**
 * Comprehensive Skill Gap Analyzer for Healthcare Technology
 * Compares user's current skills with target role requirements
 */
class SkillGapAnalyzer {
  constructor(userId, targetRoleId) {
    this.userId = userId;
    this.targetRoleId = targetRoleId;
    
    // Map proficiency levels to numeric scores
    this.skillLevels = {
      'none': 0,
      'aware': 1,
      'beginner': 2,
      'intermediate': 3,
      'advanced': 4,
      'expert': 5,
      'master': 5
    };
  }

  /**
   * Main analysis function
   * @returns {Object} Comprehensive gap analysis
   */
  async analyzeGaps() {
    try {
      // 1. Get user's current skills with proficiency levels
      const userSkills = await UserSkill.find({ userId: this.userId })
        .populate('skillId', 'name category healthcareContext');

      // 2. Get target role requirements
      const role = await CareerPath.findById(this.targetRoleId)
        .populate('requiredSkills.skillId', 'name category healthcareContext');

      if (!role) {
        throw new Error('Career path not found');
      }

      // 3. Calculate gaps
      const gaps = [];
      let totalRequiredScore = 0;
      let userCurrentScore = 0;

      for (const requiredSkill of role.requiredSkills) {
        if (!requiredSkill.skillId) continue;

        const userSkill = userSkills.find(us => 
          us.skillId && us.skillId._id.equals(requiredSkill.skillId._id)
        );

        const currentLevel = userSkill?.proficiency?.level || 'none';
        const currentLevelScore = this.skillLevels[currentLevel.toLowerCase()] || 0;
        const requiredLevel = requiredSkill.requiredLevel || 'intermediate';
        const requiredLevelScore = this.skillLevels[requiredLevel.toLowerCase()] || 3;

        const gapScore = Math.max(0, requiredLevelScore - currentLevelScore);
        const gapPercentage = requiredLevelScore > 0 
          ? (gapScore / requiredLevelScore) * 100 
          : 0;

        // Get importance from role or skill context
        const importance = requiredSkill.importance || 
          requiredSkill.skillId?.healthcareContext?.importance || 5;
        const normalizedImportance = importance / 10; // Normalize to 0-1

        // Calculate priority score
        const priorityScore = normalizedImportance * gapScore;

        // Determine severity
        const gapSeverity = this.getSeverity(gapPercentage);

        gaps.push({
          skillId: requiredSkill.skillId._id,
          skillName: requiredSkill.skillId.name,
          category: requiredSkill.skillId.category || 'General',
          currentLevel: currentLevel,
          requiredLevel: requiredLevel,
          gapScore: gapScore,
          gapPercentage: Math.round(gapPercentage),
          importance: normalizedImportance,
          priority: Math.round(priorityScore * 100) / 100,
          gapSeverity: gapSeverity,
          healthcareContext: requiredSkill.skillId.healthcareContext || {}
        });

        // Accumulate scores for readiness calculation
        totalRequiredScore += requiredLevelScore * normalizedImportance;
        userCurrentScore += currentLevelScore * normalizedImportance;
      }

      // 4. Calculate overall readiness
      const readinessScore = totalRequiredScore > 0 
        ? Math.round((userCurrentScore / totalRequiredScore) * 100) 
        : 0;

      // 5. Sort gaps by priority (highest first)
      gaps.sort((a, b) => b.priority - a.priority);

      // 6. Group by category
      const gapsByCategory = this.groupGapsByCategory(gaps);

      // 7. Generate summary
      const summary = this.generateSummary(gaps, readinessScore, role.title);

      return {
        readinessScore: readinessScore,
        totalGaps: gaps.length,
        criticalGaps: gaps.filter(g => g.gapSeverity === 'critical').length,
        highGaps: gaps.filter(g => g.gapSeverity === 'high').length,
        mediumGaps: gaps.filter(g => g.gapSeverity === 'medium').length,
        lowGaps: gaps.filter(g => g.gapSeverity === 'low').length,
        gaps: gaps,
        gapsByCategory: gapsByCategory,
        summary: summary,
        targetRole: {
          id: role._id,
          title: role.title,
          description: role.description
        }
      };
    } catch (error) {
      console.error('Error in gap analysis:', error);
      throw error;
    }
  }

  /**
   * Categorize gap severity
   * @param {Number} gapPercentage - Gap percentage (0-100)
   * @returns {String} Severity level
   */
  getSeverity(gapPercentage) {
    if (gapPercentage >= 80) return 'critical';
    if (gapPercentage >= 50) return 'high';
    if (gapPercentage >= 30) return 'medium';
    return 'low';
  }

  /**
   * Group gaps by skill category
   * @param {Array} gaps - Array of gap objects
   * @returns {Object} Gaps grouped by category
   */
  groupGapsByCategory(gaps) {
    const categories = {};
    
    gaps.forEach(gap => {
      const category = gap.category || 'General';
      if (!categories[category]) {
        categories[category] = {
          gaps: [],
          totalGaps: 0,
          criticalGaps: 0,
          averageGapPercentage: 0
        };
      }
      categories[category].gaps.push(gap);
      categories[category].totalGaps++;
      if (gap.gapSeverity === 'critical') {
        categories[category].criticalGaps++;
      }
    });

    // Calculate average gap percentage per category
    Object.keys(categories).forEach(category => {
      const categoryGaps = categories[category].gaps;
      const avgGap = categoryGaps.reduce((sum, gap) => sum + gap.gapPercentage, 0) / categoryGaps.length;
      categories[category].averageGapPercentage = Math.round(avgGap);
    });

    return categories;
  }

  /**
   * Generate human-readable summary
   * @param {Array} gaps - Array of gap objects
   * @param {Number} readinessScore - Overall readiness score
   * @param {String} roleTitle - Target role title
   * @returns {Object} Summary object
   */
  generateSummary(gaps, readinessScore, roleTitle) {
    const criticalSkills = gaps
      .filter(g => g.gapSeverity === 'critical')
      .map(g => g.skillName)
      .slice(0, 3);

    const highPrioritySkills = gaps
      .filter(g => g.priority > 2)
      .map(g => g.skillName)
      .slice(0, 3);

    const quickWins = gaps
      .filter(g => g.gapSeverity === 'low' && g.gapScore <= 1)
      .map(g => ({
        skillName: g.skillName,
        currentLevel: g.currentLevel,
        requiredLevel: g.requiredLevel,
        estimatedTime: '1-2 weeks'
      }))
      .slice(0, 2);

    const estimatedTime = this.estimateLearningTime(gaps);

    let message = `You're ${readinessScore}% ready for ${roleTitle || 'this role'}.`;
    if (readinessScore >= 80) {
      message += " You're well-prepared! Focus on advanced skills.";
    } else if (readinessScore >= 60) {
      message += " You're on track. Address critical gaps to accelerate your readiness.";
    } else if (readinessScore >= 40) {
      message += " You have a solid foundation. Focus on core competencies.";
    } else {
      message += " Build foundational skills first, then progress to advanced topics.";
    }

    return {
      message: message,
      topPriorities: criticalSkills.length > 0 ? criticalSkills : highPrioritySkills,
      estimatedTime: estimatedTime,
      quickWins: quickWins,
      focusAreas: this.identifyFocusAreas(gaps)
    };
  }

  /**
   * Estimate learning time based on gaps
   * @param {Array} gaps - Array of gap objects
   * @returns {Object} Time estimation
   */
  estimateLearningTime(gaps) {
    const hoursPerSeverity = {
      'critical': 40,  // 40 hours to go from none to expert
      'high': 30,
      'medium': 20,
      'low': 10
    };

    let totalHours = 0;
    gaps.forEach(gap => {
      const hours = hoursPerSeverity[gap.gapSeverity] || 20;
      // Weight by importance
      totalHours += hours * (1 + gap.importance);
    });

    // Convert to weeks (assuming 10 hours/week)
    const weeks = Math.ceil(totalHours / 10);
    const months = Math.ceil(weeks / 4);

    return {
      totalHours: Math.round(totalHours),
      weeks: weeks,
      months: months,
      timeline: weeks <= 4 
        ? `${weeks} weeks at 10 hrs/week`
        : `${months} months at 10 hrs/week`
    };
  }

  /**
   * Identify focus areas based on gap patterns
   * @param {Array} gaps - Array of gap objects
   * @returns {Array} Focus area recommendations
   */
  identifyFocusAreas(gaps) {
    const categoryGaps = this.groupGapsByCategory(gaps);
    const focusAreas = [];

    Object.entries(categoryGaps).forEach(([category, data]) => {
      if (data.criticalGaps > 0 || data.averageGapPercentage > 60) {
        focusAreas.push({
          category: category,
          priority: data.criticalGaps > 0 ? 'high' : 'medium',
          gapsCount: data.totalGaps,
          message: `Focus on ${category} skills - ${data.criticalGaps} critical gaps identified`
        });
      }
    });

    return focusAreas.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (b.priority === 'high' && a.priority !== 'high') return 1;
      return b.gapsCount - a.gapsCount;
    });
  }
}

module.exports = SkillGapAnalyzer;

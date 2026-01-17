const Course = require('../models/Course');
const Skill = require('../models/Skill');

/**
 * Course Recommendation Engine
 * Provides personalized course recommendations based on skill gaps
 */
class CourseRecommender {
  constructor(userId, skillGaps) {
    this.userId = userId;
    this.skillGaps = skillGaps;
  }

  /**
   * Get personalized recommendations for all skill gaps
   * @returns {Object} Recommendations with courses and learning paths
   */
  async getPersonalizedRecommendations() {
    try {
      const recommendations = [];

      // For each skill gap, find matching courses
      for (const gap of this.skillGaps) {
        const coursesForSkill = await this.findCoursesForSkill(gap);
        
        if (coursesForSkill.length > 0) {
          recommendations.push({
            skill: gap.skillName,
            skillId: gap.skillId,
            category: gap.category,
            gapSeverity: gap.gapSeverity,
            currentLevel: gap.currentLevel,
            requiredLevel: gap.requiredLevel,
            gapPercentage: gap.gapPercentage,
            courses: coursesForSkill.slice(0, 3), // Top 3 courses
            learningPath: this.generateSkillLearningPath(gap)
          });
        }
      }

      // Sort recommendations by gap severity and priority
      recommendations.sort((a, b) => {
        const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return severityOrder[b.gapSeverity] - severityOrder[a.gapSeverity];
      });

      // Generate overall learning pathway
      const learningPathway = this.generateLearningPathway(recommendations);

      // Generate summary
      const summary = this.generateRecommendationSummary(recommendations);

      return {
        recommendations: recommendations,
        learningPathway: learningPathway,
        summary: summary
      };
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  /**
   * Find courses that cover a specific skill gap
   * @param {Object} gap - Skill gap object
   * @returns {Array} Array of course recommendations with scores
   */
  async findCoursesForSkill(gap) {
    try {
      // Find courses that mention this skill in skillsCovered
      const allCourses = await Course.find({});
      
      // Filter courses that cover this skill
      const relevantCourses = allCourses.filter(course => {
        if (!course.skillsCovered || course.skillsCovered.length === 0) return false;
        
        // Check if course covers this skill (by name match)
        return course.skillsCovered.some(skillName => 
          skillName.toLowerCase().includes(gap.skillName.toLowerCase()) ||
          gap.skillName.toLowerCase().includes(skillName.toLowerCase())
        );
      });

      // If no exact match, try to find courses in same category
      if (relevantCourses.length === 0) {
        const categoryCourses = allCourses.filter(course => {
          // Match by healthcare specialty or general courses
          return course.healthcareSpecialty === 'General' || 
                 course.healthcareSpecialty !== undefined;
        });
        relevantCourses.push(...categoryCourses.slice(0, 5));
      }

      // Score and rank courses
      const scoredCourses = relevantCourses.map(course => {
        const matchScore = this.calculateCourseMatchScore(course, gap);
        const skillCoverage = this.checkSkillCoverage(course, gap);
        
        return {
          _id: course._id,
          title: course.title,
          description: course.description,
          provider: course.provider,
          url: course.url,
          healthcareSpecialty: course.healthcareSpecialty,
          coverage: skillCoverage,
          duration: course.duration || 'Not specified',
          difficulty: course.difficulty || 'intermediate',
          cost: course.cost || 0,
          matchScore: matchScore,
          skillsCovered: course.skillsCovered?.length || 0,
          whyRecommended: this.generateWhyRecommended(course, gap, matchScore)
        };
      }).filter(course => course.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);

      return scoredCourses;
    } catch (error) {
      console.error('Error finding courses for skill:', error);
      return [];
    }
  }

  /**
   * Calculate course match score using multi-factor algorithm
   * @param {Object} course - Course object
   * @param {Object} gap - Skill gap object
   * @returns {Number} Match score (0-100)
   */
  calculateCourseMatchScore(course, gap) {
    let score = 0;

    // Factor 1: Gap Coverage (40%)
    const coverageScore = this.checkSkillCoverage(course, gap);
    const coverageValue = coverageScore === 'comprehensive' ? 100 :
                         coverageScore === 'advanced' ? 75 :
                         coverageScore === 'intermediate' ? 50 :
                         coverageScore === 'basic' ? 25 : 0;
    score += coverageValue * 0.4;

    // Factor 2: Learning Style Match (20%) - Assume matches for now
    // In future, can match with user preferences
    score += 80 * 0.2; // Default 80% match

    // Factor 3: Time Efficiency (15%)
    const estimatedHours = this.parseDuration(course.duration);
    const timeScore = estimatedHours > 0 
      ? Math.max(0, 100 - (estimatedHours * 2)) // Lower hours = higher score
      : 50; // Unknown duration = neutral
    score += timeScore * 0.15;

    // Factor 4: Cost Effectiveness (15%)
    const costScore = course.cost === 0 ? 100 : 
      Math.max(0, 100 - (course.cost / 10)); // Lower cost = higher score
    score += costScore * 0.15;

    // Factor 5: Additional Skills Coverage (10%)
    const additionalSkills = (course.skillsCovered?.length || 1) - 1;
    const bonusScore = Math.min(additionalSkills * 10, 100);
    score += bonusScore * 0.1;

    return Math.round(score);
  }

  /**
   * Check how well a course covers a skill gap
   * @param {Object} course - Course object
   * @param {Object} gap - Skill gap object
   * @returns {String} Coverage level
   */
  checkSkillCoverage(course, gap) {
    if (!course.skillsCovered || course.skillsCovered.length === 0) {
      return 'basic';
    }

    // Check if skill name is in course skills
    const skillMatch = course.skillsCovered.some(skillName =>
      skillName.toLowerCase().includes(gap.skillName.toLowerCase()) ||
      gap.skillName.toLowerCase().includes(skillName.toLowerCase())
    );

    if (!skillMatch) {
      // Check category match
      const categoryMatch = course.healthcareSpecialty && 
        gap.category && 
        course.healthcareSpecialty.toLowerCase().includes(gap.category.toLowerCase());
      
      return categoryMatch ? 'basic' : 'none';
    }

    // Determine coverage depth based on course difficulty and gap severity
    if (gap.gapSeverity === 'critical' && course.difficulty === 'advanced') {
      return 'comprehensive';
    }
    if (gap.gapSeverity === 'high' && (course.difficulty === 'advanced' || course.difficulty === 'intermediate')) {
      return 'advanced';
    }
    if (gap.gapSeverity === 'medium') {
      return course.difficulty === 'advanced' ? 'advanced' : 'intermediate';
    }
    
    return 'basic';
  }

  /**
   * Generate learning path phases for a skill
   * @param {Object} gap - Skill gap object
   * @returns {Array} Learning path phases
   */
  generateSkillLearningPath(gap) {
    const learningPath = [];

    // Foundation phase for critical/high gaps
    if (gap.gapSeverity === 'critical' || gap.gapSeverity === 'high') {
      learningPath.push({
        phase: 'Foundation',
        actions: [
          'Take introductory course on ' + gap.skillName,
          'Read basic documentation and guides',
          'Complete practice exercises',
          'Join healthcare community forums'
        ],
        estimatedTime: '2-4 weeks',
        deliverables: ['Basic understanding', 'Initial practice', 'Community engagement']
      });
    }

    // Practice phase
    learningPath.push({
      phase: 'Practice',
      actions: [
        'Work on mini-projects related to ' + gap.skillName,
        'Complete case studies',
        'Participate in simulations',
        'Get feedback from peers or mentors'
      ],
      estimatedTime: '3-6 weeks',
      deliverables: ['Project implementation', 'Case study completion', 'Peer review']
    });

    // Mastery phase for advanced/expert requirements
    if (gap.requiredLevel === 'expert' || gap.requiredLevel === 'advanced' || gap.gapSeverity === 'critical') {
      learningPath.push({
        phase: 'Mastery',
        actions: [
          'Complete certification in ' + gap.skillName,
          'Contribute to open source healthcare projects',
          'Mentor others in this skill',
          'Publish case study or documentation'
        ],
        estimatedTime: '4-8 weeks',
        deliverables: ['Certification', 'Portfolio project', 'Documentation']
      });
    }

    return learningPath;
  }

  /**
   * Generate overall learning pathway
   * @param {Array} allRecommendations - All skill recommendations
   * @returns {Object} Structured learning pathway
   */
  generateLearningPathway(allRecommendations) {
    const pathway = {
      foundation: [],
      core: [],
      advanced: [],
      timeline: []
    };

    // Categorize by gap severity
    allRecommendations.forEach(rec => {
      if (rec.gapSeverity === 'critical') {
        pathway.foundation.push({
          skill: rec.skill,
          courses: rec.courses.slice(0, 1), // Top course
          timeline: 'Weeks 1-4',
          priority: 'Critical'
        });
      } else if (rec.gapSeverity === 'high') {
        pathway.core.push({
          skill: rec.skill,
          courses: rec.courses.slice(0, 1),
          timeline: 'Weeks 5-8',
          priority: 'High'
        });
      } else {
        pathway.advanced.push({
          skill: rec.skill,
          courses: rec.courses.slice(0, 1),
          timeline: 'Weeks 9-12',
          priority: 'Medium'
        });
      }
    });

    // Generate timeline
    const timeline = [];
    let weekCounter = 1;

    pathway.foundation.forEach(item => {
      timeline.push({
        week: `Week ${weekCounter}-${weekCounter + 3}`,
        focus: `Foundation: ${item.skill}`,
        action: `Complete ${item.courses[0]?.title || 'recommended course'}`,
        deliverables: ['Basic understanding', 'Practice exercises', 'Initial project'],
        priority: item.priority
      });
      weekCounter += 4;
    });

    pathway.core.forEach(item => {
      timeline.push({
        week: `Week ${weekCounter}-${weekCounter + 3}`,
        focus: `Core: ${item.skill}`,
        action: `Complete ${item.courses[0]?.title || 'recommended course'}`,
        deliverables: ['Project implementation', 'Case study', 'Peer review'],
        priority: item.priority
      });
      weekCounter += 4;
    });

    pathway.advanced.forEach(item => {
      timeline.push({
        week: `Week ${weekCounter}-${weekCounter + 3}`,
        focus: `Advanced: ${item.skill}`,
        action: `Complete ${item.courses[0]?.title || 'recommended course'}`,
        deliverables: ['Certification', 'Portfolio project', 'Documentation'],
        priority: item.priority
      });
      weekCounter += 4;
    });

    pathway.timeline = timeline;
    pathway.totalDuration = `${weekCounter - 1} weeks`;

    return pathway;
  }

  /**
   * Generate "why recommended" explanations
   * @param {Object} course - Course object
   * @param {Object} gap - Skill gap object
   * @param {Number} matchScore - Match score
   * @returns {Array} Array of reason strings
   */
  generateWhyRecommended(course, gap, matchScore) {
    const reasons = [];

    if (gap.gapSeverity === 'critical') {
      reasons.push(`Essential for ${gap.skillName} - critical gap identified`);
    }

    if (matchScore >= 80) {
      reasons.push('Highly relevant to your skill gap');
    }

    if (course.cost === 0) {
      reasons.push('Free access - no cost barrier');
    }

    const skillsCount = course.skillsCovered?.length || 0;
    if (skillsCount > 1) {
      reasons.push(`Covers ${skillsCount} skills including ${gap.skillName}`);
    }

    if (course.difficulty === gap.requiredLevel || 
        (gap.requiredLevel === 'expert' && course.difficulty === 'advanced')) {
      reasons.push(`Matches your required proficiency level`);
    }

    if (reasons.length === 0) {
      reasons.push('Recommended based on your skill gap analysis');
    }

    return reasons;
  }

  /**
   * Parse duration string to hours
   * @param {String} duration - Duration string (e.g., "4 weeks", "40 hours")
   * @returns {Number} Estimated hours
   */
  parseDuration(duration) {
    if (!duration) return 10; // Default

    if (duration.includes('week')) {
      const weeks = parseInt(duration) || 1;
      return weeks * 10; // 10 hours per week
    }
    if (duration.includes('hour')) {
      return parseInt(duration) || 10;
    }
    if (duration.includes('month')) {
      const months = parseInt(duration) || 1;
      return months * 40; // 40 hours per month
    }
    
    return 10; // Default
  }

  /**
   * Generate recommendation summary
   * @param {Array} recommendations - All recommendations
   * @returns {Object} Summary statistics
   */
  generateRecommendationSummary(recommendations) {
    const totalCourses = recommendations.reduce((sum, rec) => sum + rec.courses.length, 0);
    const criticalSkills = recommendations.filter(r => r.gapSeverity === 'critical').length;
    
    const estimatedCost = recommendations.reduce((sum, rec) => {
      return sum + rec.courses.reduce((courseSum, course) => courseSum + (course.cost || 0), 0);
    }, 0);

    const freeCourses = recommendations.reduce((sum, rec) => 
      sum + rec.courses.filter(c => c.cost === 0).length, 0
    );

    return {
      totalCoursesRecommended: totalCourses,
      criticalSkillsToAddress: criticalSkills,
      estimatedTotalCost: estimatedCost,
      freeCourses: freeCourses,
      paidCourses: totalCourses - freeCourses,
      quickStart: recommendations
        .filter(r => r.gapSeverity === 'critical')
        .slice(0, 2)
        .map(r => ({
          skill: r.skill,
          course: r.courses[0]?.title || 'Recommended course',
          matchScore: r.courses[0]?.matchScore || 0
        }))
    };
  }
}

module.exports = CourseRecommender;

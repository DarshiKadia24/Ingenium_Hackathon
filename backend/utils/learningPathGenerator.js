const SkillGapAnalyzer = require('./skillGapAnalyzer');
const CourseRecommender = require('./courseRecommender');

/**
 * Learning Path Generator
 * Creates structured learning journeys with timelines
 */
class LearningPathGenerator {
  constructor(userId, targetRoleId, timeline = 'balanced') {
    this.userId = userId;
    this.targetRoleId = targetRoleId;
    this.timeline = timeline; // 'fast', 'balanced', 'comprehensive'
  }

  /**
   * Generate complete learning path
   * @returns {Object} Complete learning path with phases and timeline
   */
  async generate() {
    try {
      // 1. Analyze gaps
      const analyzer = new SkillGapAnalyzer(this.userId, this.targetRoleId);
      const analysis = await analyzer.analyzeGaps();

      // 2. Get recommendations
      const recommender = new CourseRecommender(this.userId, analysis.gaps);
      const recommendations = await recommender.getPersonalizedRecommendations();

      // 3. Organize into phases
      const phases = this.organizePhases(recommendations.recommendations, analysis);

      // 4. Generate weekly plan
      const weeklyPlan = this.generateWeeklyPlan(phases, recommendations.learningPathway);

      // 5. Generate milestones
      const milestones = this.generateMilestones(phases, analysis);

      // 6. Calculate completion date
      const estimatedCompletion = this.calculateCompletionDate(weeklyPlan);

      return {
        userId: this.userId,
        targetRoleId: this.targetRoleId,
        generatedAt: new Date(),
        readinessScore: analysis.readinessScore,
        timeline: this.timeline,
        estimatedCompletion: estimatedCompletion,
        phases: phases,
        weeklyPlan: weeklyPlan,
        milestones: milestones,
        resources: this.compileResources(recommendations),
        summary: {
          totalWeeks: weeklyPlan.length,
          totalCourses: recommendations.summary.totalCoursesRecommended,
          estimatedCost: recommendations.summary.estimatedTotalCost,
          focusAreas: analysis.summary.focusAreas
        }
      };
    } catch (error) {
      console.error('Error generating learning path:', error);
      throw error;
    }
  }

  /**
   * Organize recommendations into learning phases
   * @param {Array} recommendations - Course recommendations
   * @param {Object} analysis - Gap analysis results
   * @returns {Array} Organized phases
   */
  organizePhases(recommendations, analysis) {
    const phases = [
      {
        title: 'Foundation',
        description: 'Build core competencies and address critical gaps',
        skills: [],
        courses: [],
        timeline: 'Weeks 1-4',
        priority: 'Critical'
      },
      {
        title: 'Core Development',
        description: 'Develop main skills and fill high-priority gaps',
        skills: [],
        courses: [],
        timeline: 'Weeks 5-8',
        priority: 'High'
      },
      {
        title: 'Advanced Specialization',
        description: 'Master advanced skills and complete remaining gaps',
        skills: [],
        courses: [],
        timeline: 'Weeks 9-12',
        priority: 'Medium'
      }
    ];

    // Adjust timeline based on preference
    if (this.timeline === 'fast') {
      phases[0].timeline = 'Weeks 1-2';
      phases[1].timeline = 'Weeks 3-4';
      phases[2].timeline = 'Weeks 5-6';
    } else if (this.timeline === 'comprehensive') {
      phases[0].timeline = 'Weeks 1-6';
      phases[1].timeline = 'Weeks 7-12';
      phases[2].timeline = 'Weeks 13-18';
    }

    // Distribute recommendations across phases
    recommendations.forEach(rec => {
      const topCourse = rec.courses[0];
      if (!topCourse) return;

      if (rec.gapSeverity === 'critical') {
        phases[0].skills.push({
          name: rec.skill,
          currentLevel: rec.currentLevel,
          requiredLevel: rec.requiredLevel,
          gapPercentage: rec.gapPercentage
        });
        phases[0].courses.push(topCourse);
      } else if (rec.gapSeverity === 'high') {
        phases[1].skills.push({
          name: rec.skill,
          currentLevel: rec.currentLevel,
          requiredLevel: rec.requiredLevel,
          gapPercentage: rec.gapPercentage
        });
        phases[1].courses.push(topCourse);
      } else {
        phases[2].skills.push({
          name: rec.skill,
          currentLevel: rec.currentLevel,
          requiredLevel: rec.requiredLevel,
          gapPercentage: rec.gapPercentage
        });
        phases[2].courses.push(topCourse);
      }
    });

    return phases;
  }

  /**
   * Generate weekly breakdown
   * @param {Array} phases - Learning phases
   * @param {Object} learningPathway - Pathway structure
   * @returns {Array} Weekly plan
   */
  generateWeeklyPlan(phases, learningPathway) {
    const weeklyPlan = [];
    let weekNumber = 1;

    phases.forEach((phase, phaseIndex) => {
      const weeksInPhase = this.timeline === 'fast' ? 2 : 
                          this.timeline === 'comprehensive' ? 6 : 4;

      for (let i = 0; i < weeksInPhase && phase.courses.length > 0; i++) {
        const courseIndex = Math.floor((i / weeksInPhase) * phase.courses.length);
        const course = phase.courses[courseIndex] || phase.courses[0];
        const skill = phase.skills[courseIndex] || phase.skills[0];

        weeklyPlan.push({
          week: weekNumber,
          phase: phase.title,
          focus: skill ? `${skill.name} (${phase.title})` : phase.title,
          action: `Complete: ${course.title}`,
          deliverables: this.getDeliverablesForWeek(phase.title, weekNumber),
          resources: [course],
          estimatedHours: 10,
          priority: phase.priority
        });

        weekNumber++;
      }
    });

    return weeklyPlan;
  }

  /**
   * Get deliverables for a specific week
   * @param {String} phase - Phase name
   * @param {Number} week - Week number
   * @returns {Array} Deliverables
   */
  getDeliverablesForWeek(phase, week) {
    if (phase === 'Foundation') {
      return ['Course completion', 'Basic understanding', 'Practice exercises'];
    } else if (phase === 'Core Development') {
      return ['Project implementation', 'Case study', 'Peer review'];
    } else {
      return ['Advanced project', 'Certification prep', 'Portfolio addition'];
    }
  }

  /**
   * Generate milestones
   * @param {Array} phases - Learning phases
   * @param {Object} analysis - Gap analysis
   * @returns {Array} Milestones
   */
  generateMilestones(phases, analysis) {
    const milestones = [];
    const today = new Date();
    let weekOffset = 0;

    phases.forEach((phase, index) => {
      const weeksInPhase = this.timeline === 'fast' ? 2 : 
                          this.timeline === 'comprehensive' ? 6 : 4;
      
      const milestoneDate = new Date(today);
      milestoneDate.setDate(today.getDate() + (weekOffset + weeksInPhase) * 7);

      milestones.push({
        name: `Complete ${phase.title} Phase`,
        date: milestoneDate.toISOString().split('T')[0],
        criteria: [
          `Complete ${phase.courses.length} courses in ${phase.title}`,
          `Master ${phase.skills.length} core skills`,
          `Achieve proficiency in ${phase.skills.map(s => s.name).join(', ')}`
        ],
        skillsCount: phase.skills.length,
        coursesCount: phase.courses.length
      });

      weekOffset += weeksInPhase;
    });

    // Final milestone
    const finalDate = new Date(today);
    finalDate.setDate(today.getDate() + weekOffset * 7);
    milestones.push({
      name: 'Ready for Target Role',
      date: finalDate.toISOString().split('T')[0],
      criteria: [
        `Achieve ${analysis.readinessScore + 20}% readiness score`,
        'Complete all critical skill gaps',
        'Build portfolio of healthcare projects'
      ],
      skillsCount: analysis.totalGaps,
      coursesCount: phases.reduce((sum, p) => sum + p.courses.length, 0)
    });

    return milestones;
  }

  /**
   * Calculate estimated completion date
   * @param {Array} weeklyPlan - Weekly plan
   * @returns {String} Completion date
   */
  calculateCompletionDate(weeklyPlan) {
    const totalWeeks = weeklyPlan.length;
    const today = new Date();
    const completionDate = new Date(today);
    completionDate.setDate(today.getDate() + totalWeeks * 7);
    return completionDate.toISOString().split('T')[0];
  }

  /**
   * Compile all resources
   * @param {Object} recommendations - Recommendations object
   * @returns {Object} Compiled resources
   */
  compileResources(recommendations) {
    const allCourses = [];
    const allSkills = [];

    recommendations.recommendations.forEach(rec => {
      allSkills.push({
        name: rec.skill,
        severity: rec.gapSeverity,
        learningPath: rec.learningPath
      });
      rec.courses.forEach(course => {
        if (!allCourses.find(c => c._id === course._id)) {
          allCourses.push(course);
        }
      });
    });

    return {
      courses: allCourses,
      skills: allSkills,
      totalResources: allCourses.length + allSkills.length
    };
  }
}

module.exports = LearningPathGenerator;

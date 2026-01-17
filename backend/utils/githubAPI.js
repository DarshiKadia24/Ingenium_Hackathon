const axios = require('axios');

/**
 * GitHub API Integration for Healthcare Project Recommendations
 * Fetches relevant healthcare technology repositories
 */
class GitHubAPI {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.healthcareTopics = [
      'healthcare',
      'health-informatics',
      'medical-devices',
      'telemedicine',
      'ehr',
      'hipaa',
      'clinical-data',
      'healthcare-analytics',
      'healthcare-cybersecurity',
      'fhir',
      'hl7',
      'medical-imaging',
    ];
  }

  /**
   * Search for healthcare-related repositories
   * @param {Object} options - Search options
   * @returns {Array} Array of repository recommendations
   */
  async searchHealthcareRepos(options = {}) {
    try {
      const {
        query = 'healthcare',
        language = 'javascript',
        sort = 'stars',
        order = 'desc',
        perPage = 10,
      } = options;

      // Build search query
      const searchQuery = `${query} language:${language} topic:healthcare`;
      
      const response = await axios.get(`${this.baseURL}/search/repositories`, {
        params: {
          q: searchQuery,
          sort: sort,
          order: order,
          per_page: perPage,
        },
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      // Transform GitHub API response to our format
      const repos = response.data.items.map(repo => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        owner: {
          login: repo.owner.login,
          avatar: repo.owner.avatar_url,
        },
        matchScore: this.calculateMatchScore(repo, query),
        healthcareRelevance: this.assessHealthcareRelevance(repo),
      }));

      return repos.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      console.error('Error searching GitHub repositories:', error);
      if (error.response?.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw error;
    }
  }

  /**
   * Get project recommendations based on skill gaps
   * @param {Array} skillGaps - Array of skill gap objects
   * @returns {Array} Recommended projects
   */
  async getProjectRecommendations(skillGaps) {
    try {
      const recommendations = [];
      const processedRepos = new Set();

      // For each skill gap, search for relevant projects
      for (const gap of skillGaps.slice(0, 5)) { // Limit to top 5 gaps
        const skillName = gap.skillName.toLowerCase();
        
        // Map skill names to GitHub search terms
        const searchTerms = this.mapSkillToSearchTerms(skillName);
        
        for (const term of searchTerms) {
          try {
            const repos = await this.searchHealthcareRepos({
              query: term,
              perPage: 3,
            });

            repos.forEach(repo => {
              if (!processedRepos.has(repo.id)) {
                recommendations.push({
                  ...repo,
                  relatedSkill: gap.skillName,
                  gapSeverity: gap.gapSeverity,
                  whyRecommended: `Relevant to ${gap.skillName} skill gap`,
                });
                processedRepos.add(repo.id);
              }
            });

            // Rate limiting: wait between requests
            await new Promise(resolve => setTimeout(resolve, 1000));
          } catch (error) {
            console.error(`Error searching for term "${term}":`, error.message);
            // Continue with next term
          }
        }
      }

      // If no specific matches, get general healthcare projects
      if (recommendations.length === 0) {
        const generalRepos = await this.searchHealthcareRepos({
          query: 'healthcare',
          perPage: 10,
        });
        recommendations.push(...generalRepos.map(repo => ({
          ...repo,
          relatedSkill: 'General Healthcare Technology',
          gapSeverity: 'medium',
          whyRecommended: 'Popular healthcare technology project',
        })));
      }

      return recommendations.slice(0, 10); // Return top 10
    } catch (error) {
      console.error('Error getting project recommendations:', error);
      // Return fallback recommendations
      return this.getFallbackRecommendations();
    }
  }

  /**
   * Map skill names to GitHub search terms
   * @param {String} skillName - Skill name
   * @returns {Array} Array of search terms
   */
  mapSkillToSearchTerms(skillName) {
    const skillMappings = {
      'hipaa': ['hipaa', 'healthcare-compliance', 'patient-privacy'],
      'fhir': ['fhir', 'fast-healthcare-interoperability'],
      'ehr': ['ehr', 'electronic-health-record', 'emr'],
      'clinical': ['clinical-data', 'clinical-informatics', 'clinical-analytics'],
      'telemedicine': ['telemedicine', 'telehealth', 'remote-healthcare'],
      'medical imaging': ['medical-imaging', 'dicom', 'radiology'],
      'healthcare analytics': ['healthcare-analytics', 'health-data', 'clinical-analytics'],
      'cybersecurity': ['healthcare-cybersecurity', 'medical-device-security'],
      'python': ['healthcare python', 'medical python'],
      'javascript': ['healthcare javascript', 'medical javascript'],
      'react': ['healthcare react', 'medical react'],
      'node': ['healthcare node', 'medical node'],
    };

    // Find matching terms
    for (const [key, terms] of Object.entries(skillMappings)) {
      if (skillName.includes(key.toLowerCase())) {
        return terms;
      }
    }

    // Default: use skill name as search term
    return [skillName, `healthcare ${skillName}`];
  }

  /**
   * Calculate match score for a repository
   * @param {Object} repo - Repository object from GitHub API
   * @param {String} query - Search query
   * @returns {Number} Match score (0-100)
   */
  calculateMatchScore(repo, query) {
    let score = 50; // Base score

    // Boost if query terms appear in name or description
    const queryTerms = query.toLowerCase().split(' ');
    const nameLower = repo.name.toLowerCase();
    const descLower = (repo.description || '').toLowerCase();

    queryTerms.forEach(term => {
      if (nameLower.includes(term)) score += 20;
      if (descLower.includes(term)) score += 10;
    });

    // Boost for healthcare topics
    if (repo.topics) {
      const healthcareTopics = repo.topics.filter(topic =>
        this.healthcareTopics.some(ht => topic.toLowerCase().includes(ht))
      );
      score += healthcareTopics.length * 10;
    }

    // Boost for stars (popularity)
    if (repo.stargazers_count > 100) score += 10;
    if (repo.stargazers_count > 1000) score += 10;

    // Cap at 100
    return Math.min(100, score);
  }

  /**
   * Assess healthcare relevance of a repository
   * @param {Object} repo - Repository object
   * @returns {String} Relevance level
   */
  assessHealthcareRelevance(repo) {
    const nameLower = repo.name.toLowerCase();
    const descLower = (repo.description || '').toLowerCase();
    const text = `${nameLower} ${descLower}`;

    let relevanceScore = 0;

    // Check for healthcare keywords
    const keywords = [
      'healthcare', 'medical', 'clinical', 'patient', 'hospital',
      'health', 'ehr', 'emr', 'hipaa', 'fhir', 'hl7', 'telemedicine',
      'diagnosis', 'treatment', 'pharmacy', 'radiology', 'laboratory',
    ];

    keywords.forEach(keyword => {
      if (text.includes(keyword)) relevanceScore++;
    });

    // Check topics
    if (repo.topics) {
      const healthcareTopics = repo.topics.filter(topic =>
        this.healthcareTopics.some(ht => topic.toLowerCase().includes(ht))
      );
      relevanceScore += healthcareTopics.length * 2;
    }

    if (relevanceScore >= 5) return 'high';
    if (relevanceScore >= 2) return 'medium';
    return 'low';
  }

  /**
   * Get fallback recommendations when API fails
   * @returns {Array} Fallback project recommendations
   */
  getFallbackRecommendations() {
    return [
      {
        id: 'fallback-1',
        name: 'FHIR Server',
        fullName: 'smart-on-fhir/server',
        description: 'Open source FHIR server implementation for healthcare interoperability',
        url: 'https://github.com/smart-on-fhir/server',
        stars: 500,
        language: 'JavaScript',
        healthcareRelevance: 'high',
        whyRecommended: 'Essential for healthcare data interoperability',
      },
      {
        id: 'fallback-2',
        name: 'OpenMRS',
        fullName: 'openmrs/openmrs-core',
        description: 'Open source electronic medical record system',
        url: 'https://github.com/openmrs/openmrs-core',
        stars: 1000,
        language: 'Java',
        healthcareRelevance: 'high',
        whyRecommended: 'Industry-standard EMR system',
      },
      {
        id: 'fallback-3',
        name: 'Healthcare Data Models',
        fullName: 'OHDSI/CommonDataModel',
        description: 'Common data model for healthcare observational research',
        url: 'https://github.com/OHDSI/CommonDataModel',
        stars: 800,
        language: 'SQL',
        healthcareRelevance: 'high',
        whyRecommended: 'Standard for clinical data analysis',
      },
    ];
  }
}

module.exports = GitHubAPI;

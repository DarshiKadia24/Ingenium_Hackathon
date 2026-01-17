import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api', // Proxy will forward to backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Users API calls
export const usersAPI = {
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  getUserProgress: (id) => api.get(`/users/${id}/progress`),
};

// Skills API calls
export const skillsAPI = {
  getAllSkills: (params) => api.get('/skills', { params }),
  getSkillById: (id) => api.get(`/skills/${id}`),
  getSkillsBySpecialty: (specialty) => api.get(`/skills/specialty/${specialty}`),
  getUserSkills: (userId) => api.get(`/skills/user/${userId}`),
  rateSkill: (data) => api.post('/skills/rate', data),
  createSkill: (skillData) => api.post('/skills', skillData),
  updateSkill: (id, skillData) => api.put(`/skills/${id}`, skillData),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
};

// User Skills API calls
export const userSkillsAPI = {
  getAllUserSkills: (params) => api.get('/user-skills', { params }),
  getUserSkillById: (id) => api.get(`/user-skills/${id}`),
  createUserSkill: (data) => api.post('/user-skills', data),
  updateUserSkill: (id, data) => api.put(`/user-skills/${id}`, data),
  deleteUserSkill: (id) => api.delete(`/user-skills/${id}`),
};

// Courses API calls
export const coursesAPI = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (courseData) => api.post('/courses', courseData),
  updateCourse: (id, courseData) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
};

// Career Paths API calls
export const careerPathsAPI = {
  getAllCareerPaths: (params) => api.get('/career-paths', { params }),
  getCareerPathById: (id) => api.get(`/career-paths/${id}`),
  createCareerPath: (data) => api.post('/career-paths', data),
  updateCareerPath: (id, data) => api.put(`/career-paths/${id}`, data),
  deleteCareerPath: (id) => api.delete(`/career-paths/${id}`),
};

// Recommendations API calls
export const recommendationsAPI = {
  getUserRecommendations: (userId) => api.get(`/recommendations/${userId}`),
  getSpecialtyRecommendations: (specialty) => api.get(`/recommendations/specialty/${specialty}`),
};

// Progress API calls
export const progressAPI = {
  getUserProgress: (userId) => api.get(`/progress/${userId}`),
  updateProgress: (data) => api.post('/progress/update', data),
};

// Analysis API calls
export const analysisAPI = {
  analyzeGaps: (data) => api.post('/analysis/gap', data),
  getRecommendations: (data) => api.post('/analysis/recommendations', data),
  generateLearningPath: (data) => api.post('/analysis/learning-path', data),
};

// GitHub API calls (External API Integration)
export const githubAPI = {
  getProjects: (params) => api.get('/github/projects', { params }),
  getProjectRecommendations: (data) => api.post('/github/recommendations', data),
};

// Academic Performance API calls
export const academicAPI = {
  getAcademicPerformance: (userId) => api.get(`/academic/${userId}`),
  updateAcademicPerformance: (userId, data) => api.post(`/academic/${userId}`, data),
  addCourse: (userId, courseData) => api.post(`/academic/${userId}/courses`, courseData),
};

// Projects API calls
export const projectsAPI = {
  getUserProjects: (userId, params) => api.get(`/projects/${userId}`, { params }),
  createProject: (projectData) => api.post('/projects', projectData),
  updateProject: (projectId, projectData) => api.put(`/projects/${projectId}`, projectData),
  deleteProject: (projectId) => api.delete(`/projects/${projectId}`),
};

// Learning Activities API calls
export const learningActivitiesAPI = {
  getUserLearningActivities: (userId, params) => api.get(`/learning-activities/${userId}`, { params }),
  createLearningActivity: (activityData) => api.post('/learning-activities', activityData),
  updateLearningActivity: (activityId, activityData) => api.put(`/learning-activities/${activityId}`, activityData),
  deleteLearningActivity: (activityId) => api.delete(`/learning-activities/${activityId}`),
};

export default api;

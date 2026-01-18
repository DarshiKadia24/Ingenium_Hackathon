import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: '/api', // forwarded to backend via proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚫 RESPONSE INTERCEPTOR (DISABLED AUTO LOGOUT FOR DEV)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hackathon mode: do NOT auto logout on 401
    return Promise.reject(error);
  }
);

/* =========================
   AUTH APIs
========================= */
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

/* =========================
   USER APIs
========================= */
export const usersAPI = {
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  getUserProgress: (id) => api.get(`/users/${id}/progress`),
};

/* =========================
   SKILLS APIs
========================= */
export const skillsAPI = {
  getAllSkills: (params) => api.get('/skills', { params }),
  getSkillById: (id) => api.get(`/skills/${id}`),
  getSkillsBySpecialty: (specialty) =>
    api.get(`/skills/specialty/${specialty}`),
  getUserSkills: (userId) => api.get(`/skills/user/${userId}`),
  rateSkill: (data) => api.post('/skills/rate', data),
  createSkill: (data) => api.post('/skills', data),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
};

/* =========================
   USER SKILLS APIs
========================= */
export const userSkillsAPI = {
  getAllUserSkills: (params) => api.get('/user-skills', { params }),
  getUserSkillById: (id) => api.get(`/user-skills/${id}`),
  createUserSkill: (data) => api.post('/user-skills', data),
  updateUserSkill: (id, data) => api.put(`/user-skills/${id}`, data),
  deleteUserSkill: (id) => api.delete(`/user-skills/${id}`),
};

/* =========================
   COURSES APIs
========================= */
export const coursesAPI = {
  getAllCourses: (params) => api.get('/courses', { params }),
  getCourseById: (id) => api.get(`/courses/${id}`),
  createCourse: (data) => api.post('/courses', data),
  updateCourse: (id, data) => api.put(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
};

/* =========================
   CAREER PATH APIs
========================= */
export const careerPathsAPI = {
  getAllCareerPaths: (params) => api.get('/career-paths', { params }),
  getCareerPathById: (id) => api.get(`/career-paths/${id}`),
  createCareerPath: (data) => api.post('/career-paths', data),
  updateCareerPath: (id, data) => api.put(`/career-paths/${id}`, data),
  deleteCareerPath: (id) => api.delete(`/career-paths/${id}`),
};

/* =========================
   RECOMMENDATIONS APIs
========================= */
export const recommendationsAPI = {
  getUserRecommendations: (userId) =>
    api.get(`/recommendations/${userId}`),
  getSpecialtyRecommendations: (specialty) =>
    api.get(`/recommendations/specialty/${specialty}`),
};

/* =========================
   PROGRESS APIs
========================= */
export const progressAPI = {
  getUserProgress: (userId) => api.get(`/progress/${userId}`),
  updateProgress: (data) => api.post('/progress/update', data),
};

/* =========================
   ANALYSIS APIs
========================= */
export const analysisAPI = {
  analyzeGaps: (data) => api.post('/analysis/gap', data),
  getRecommendations: (data) =>
    api.post('/analysis/recommendations', data),
  generateLearningPath: (data) =>
    api.post('/analysis/learning-path', data),
};

/* =========================
   GITHUB APIs
========================= */
export const githubAPI = {
  getProjects: (params) => api.get('/github/projects', { params }),
  getProjectRecommendations: (data) =>
    api.post('/github/recommendations', data),
};

/* =========================
   ACADEMIC APIs
========================= */
export const academicAPI = {
  getAcademicPerformance: (userId) =>
    api.get(`/academic/${userId}`),
  updateAcademicPerformance: (userId, data) =>
    api.post(`/academic/${userId}`, data),
  addCourse: (userId, data) =>
    api.post(`/academic/${userId}/courses`, data),
};

/* =========================
   PROJECT APIs
========================= */
export const projectsAPI = {
  getUserProjects: (userId, params) =>
    api.get(`/projects/${userId}`, { params }),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) =>
    api.put(`/projects/${id}`, data),
  deleteProject: (id) =>
    api.delete(`/projects/${id}`),
};

/* =========================
   LEARNING ACTIVITY APIs
========================= */
export const learningActivitiesAPI = {
  getUserLearningActivities: (userId, params) =>
    api.get(`/learning-activities/${userId}`, { params }),
  createLearningActivity: (data) =>
    api.post('/learning-activities', data),
  updateLearningActivity: (id, data) =>
    api.put(`/learning-activities/${id}`, data),
  deleteLearningActivity: (id) =>
    api.delete(`/learning-activities/${id}`),
};

export default api;
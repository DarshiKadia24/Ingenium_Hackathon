const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

// GET /api/courses - Get all courses
router.get('/', getAllCourses);

// GET /api/courses/:id - Get course by ID
router.get('/:id', getCourseById);

// POST /api/courses - Create a new course
router.post('/', createCourse);

// PUT /api/courses/:id - Update a course
router.put('/:id', updateCourse);

// DELETE /api/courses/:id - Delete a course
router.delete('/:id', deleteCourse);

module.exports = router;

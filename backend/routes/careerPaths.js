const express = require('express');
const router = express.Router();
const {
  getAllCareerPaths,
  getCareerPathById,
  createCareerPath,
  updateCareerPath,
  deleteCareerPath,
} = require('../controllers/careerPathController');

// GET /api/career-paths - Get all career paths
router.get('/', getAllCareerPaths);

// GET /api/career-paths/:id - Get career path by ID
router.get('/:id', getCareerPathById);

// POST /api/career-paths - Create a new career path
router.post('/', createCareerPath);

// PUT /api/career-paths/:id - Update a career path
router.put('/:id', updateCareerPath);

// DELETE /api/career-paths/:id - Delete a career path
router.delete('/:id', deleteCareerPath);

module.exports = router;

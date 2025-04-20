const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Dashboard routes
router.get('/stats', dashboardController.getDashboardStats);
router.get('/recent-notes', dashboardController.getRecentNotes);
router.get('/favorite-notes', dashboardController.getFavoriteNotes);

module.exports = router;
const express = require('express');
const {
  updateProfile,
  updatePassword,
  uploadAvatar,
  updateSettings
} = require('../controllers/user.controller');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(protect);

// Profile and settings
router.put('/profile', updateProfile);
router.put('/password', updatePassword);
router.put('/avatar', uploadAvatar);
router.put('/settings', updateSettings);

module.exports = router;
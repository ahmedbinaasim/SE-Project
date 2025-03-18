const express = require('express');
const {
  getProfile,
  updateProfile
} = require('../controllers/profile');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getProfile)
  .put(protect, updateProfile);

module.exports = router;
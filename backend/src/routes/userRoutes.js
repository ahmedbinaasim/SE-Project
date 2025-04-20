const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// User profile routes
router.get('/me', userController.getCurrentUser);
router.patch('/profile', userController.updateProfile);

// Account settings routes
router.patch('/password', userController.updatePassword);
router.patch('/two-factor', userController.updateTwoFactorAuth);

// Appearance settings routes
router.patch('/appearance', userController.updateAppearance);

// Notification settings routes
router.patch('/notifications', userController.updateNotifications);

// Delete account
router.delete('/account', userController.deleteAccount);

module.exports = router;
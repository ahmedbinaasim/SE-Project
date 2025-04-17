const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const path = require('path');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  // Fields to update
  const fieldsToUpdate = {
    name: req.body.name
  };

  // Find and update user
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/users/password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new ErrorResponse('Please provide both current and new password', 400));
  }

  // Get user with password
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  // Set new password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
});

// @desc    Upload user avatar
// @route   PUT /api/users/avatar
// @access  Private
exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.avatar) {
    return next(new ErrorResponse('Please upload an avatar image', 400));
  }

  const file = req.files.avatar;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  // Check file size (limit to 1MB)
  if (file.size > 1000000) {
    return next(new ErrorResponse('Please upload an image less than 1MB', 400));
  }

  // Create a unique filename
  file.name = `avatar_${req.user.id}${path.parse(file.name).ext}`;

  // Upload file to the public/uploads folder
  file.mv(`./public/uploads/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    // Update user avatar in database
    await User.findByIdAndUpdate(req.user.id, {
      avatar: `/uploads/${file.name}`
    });

    res.status(200).json({
      success: true,
      data: `/uploads/${file.name}`
    });
  });
});

// @desc    Update account settings
// @route   PUT /api/users/settings
// @access  Private
exports.updateSettings = asyncHandler(async (req, res, next) => {
  // Currently, this is a placeholder for future settings
  // You can extend this to handle various user settings like theme, notifications, etc.
  
  res.status(200).json({
    success: true,
    message: 'Settings updated successfully'
  });
});
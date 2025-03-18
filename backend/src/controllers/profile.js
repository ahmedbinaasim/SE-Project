const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get user profile
// @route   GET /api/v1/profile
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return next(new ErrorResponse('Profile not found', 404));
  }

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Update profile
// @route   PUT /api/v1/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
      bio: req.body.bio,
      avatar: req.body.avatar,
      preferences: {
        ...req.body.preferences
      }
    };
  
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );
  
    if (!profile) {
      return next(new ErrorResponse('Profile not found', 404));
    }
  
    res.status(200).json({
      success: true,
      data: profile
    });
  });
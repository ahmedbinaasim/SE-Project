const User = require('../models/User');
const Profile = require('../models/Profile');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register user and send OTP
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorResponse('Email already registered', 400));
  }

  // Create user
  user = await User.create({
    name,
    email,
    password
  });

  // Generate OTP
  const otp = user.generateOTP();
  await user.save();

  // Send OTP email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Study Notes Organizer Verification Code',
      message: `Your verification code is ${otp}. This code will expire in 10 minutes.`
    });

    res.status(200).json({
      success: true,
      message: 'Verification code sent to email',
      data: {
        userId: user._id
      }
    });
  } catch (err) {
    user.otp = undefined;
    await user.save();

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Verify OTP and complete registration
// @route   POST /api/v1/auth/verify-otp
// @access  Public
exports.verifyOTP = asyncHandler(async (req, res, next) => {
  const { userId, otp } = req.body;

  // Find user by ID
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('Invalid user ID', 404));
  }

  // Check if OTP exists and is valid
  if (!user.otp || !user.otp.code) {
    return next(new ErrorResponse('OTP not found or already used', 400));
  }

  // Check if OTP is expired
  if (user.otp.expiry < Date.now()) {
    return next(new ErrorResponse('OTP has expired', 400));
  }

  // Check if OTP matches
  if (user.otp.code !== otp) {
    return next(new ErrorResponse('Invalid OTP', 400));
  }

  // Set user as verified
  user.isVerified = true;
  user.otp = undefined;
  await user.save();

  // Create user profile
  await Profile.create({
    user: user._id
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Resend OTP
// @route   POST /api/v1/auth/resend-otp
// @access  Public
exports.resendOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  if (user.isVerified) {
    return next(new ErrorResponse('User already verified', 400));
  }

  // Generate new OTP
  const otp = user.generateOTP();
  await user.save();

  // Send OTP email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Study Notes Organizer Verification Code',
      message: `Your verification code is ${otp}. This code will expire in 10 minutes.`
    });

    res.status(200).json({
      success: true,
      message: 'Verification code resent to email',
      data: {
        userId: user._id
      }
    });
  } catch (err) {
    user.otp = undefined;
    await user.save();

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if user is verified
  if (!user.isVerified) {
    // Generate new OTP for convenience
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your Study Notes Organizer Verification Code',
        message: `Your verification code is ${otp}. This code will expire in 10 minutes.`
      });

      return res.status(400).json({
        success: false,
        message: 'Account not verified. A new verification code has been sent to your email.',
        data: {
          userId: user._id
        }
      });
    } catch (err) {
      user.otp = undefined;
      await user.save();

      return next(new ErrorResponse('Email could not be sent', 500));
    }
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Update last active in profile
  await Profile.findOneAndUpdate(
    { user: user._id },
    { 'stats.lastActive': Date.now() }
  );

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

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
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  const isMatch = await user.matchPassword(req.body.currentPassword);

  if (!isMatch) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Generate OTP for password reset
  const otp = user.generateOTP();
  await user.save();

  // Send email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset OTP',
      message: `Your password reset code is ${otp}. This code will expire in 10 minutes.`
    });

    res.status(200).json({
      success: true,
      message: 'Password reset code sent to email',
      data: {
        userId: user._id
      }
    });
  } catch (err) {
    user.otp = undefined;
    await user.save();

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password with OTP
// @route   PUT /api/v1/auth/resetpassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { userId, otp, newPassword } = req.body;

  // Find user
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('Invalid user ID', 404));
  }

  // Check if OTP exists and is valid
  if (!user.otp || !user.otp.code) {
    return next(new ErrorResponse('OTP not found or already used', 400));
  }

  // Check if OTP is expired
  if (user.otp.expiry < Date.now()) {
    return next(new ErrorResponse('OTP has expired', 400));
  }

  // Check if OTP matches
  if (user.otp.code !== otp) {
    return next(new ErrorResponse('Invalid OTP', 400));
  }

  // Set new password
  user.password = newPassword;
  user.otp = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password reset successful'
  });
});

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {}
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};
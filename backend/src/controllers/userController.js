const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { sendPasswordChangeEmail } = require('../utils/email');

// Helper function to ensure user settings exist
const ensureUserSettings = async (userId) => {
  const user = await User.findById(userId);
  let updated = false;

  // Initialize settings if they don't exist
  if (!user.settings) {
    user.settings = {};
    updated = true;
  }

  // Initialize appearance settings if they don't exist
  if (!user.settings.appearance) {
    user.settings.appearance = {
      theme: 'system',
      fontSize: 'normal'
    };
    updated = true;
  }

  // Initialize notification settings if they don't exist
  if (!user.settings.notifications) {
    user.settings.notifications = {
      emailNotifications: true,
      pushNotifications: false,
      newShare: true,
      newComment: true,
      mentionNotification: true,
      reminderNotification: true,
      marketingEmails: false
    };
    updated = true;
  }

  // Save user if settings were updated
  if (updated) {
    await user.save();
  }

  return user;
};

// Helper to format user data for response
const formatUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio || '',
    twoFactorEnabled: user.twoFactorEnabled || false,
    settings: user.settings || {
      appearance: {
        theme: 'system',
        fontSize: 'normal'
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: false,
        newShare: true,
        newComment: true,
        mentionNotification: true,
        reminderNotification: true,
        marketingEmails: false
      }
    },
    emailVerified: user.emailVerified || false,
    createdAt: user.createdAt
  };
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    // Ensure user has all required settings
    const user = await ensureUserSettings(req.user._id);
    
    res.status(200).json({
      status: 'success',
      data: {
        user: formatUserResponse(user)
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user profile'
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const userId = req.user._id;

    // Check if email is already taken by another user
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({
          status: 'fail',
          message: 'Email is already in use by another account'
        });
      }
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        bio
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          bio: updatedUser.bio || '',
        }
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update profile'
    });
  }
};

// Update account settings (password change)
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Get user with password
    const user = await User.findById(userId).select('+password');

    // Check if current password is correct
    if (!(await user.isPasswordCorrect(currentPassword, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Send password change confirmation email
    await sendPasswordChangeEmail(user);

    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update password'
    });
  }
};

// Update 2FA settings
exports.updateTwoFactorAuth = async (req, res) => {
  try {
    const { twoFactorEnabled } = req.body;
    const userId = req.user._id;

    // Update 2FA setting
    await User.findByIdAndUpdate(
      userId,
      { twoFactorEnabled },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Two-factor authentication settings updated'
    });
  } catch (error) {
    console.error('Error updating 2FA settings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update two-factor authentication settings'
    });
  }
};

// Update appearance settings
exports.updateAppearance = async (req, res) => {
  try {
    const { theme, fontSize } = req.body;
    const userId = req.user._id;

    // Update appearance settings
    await User.findByIdAndUpdate(
      userId,
      {
        'settings.appearance.theme': theme,
        'settings.appearance.fontSize': fontSize
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Appearance settings updated'
    });
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update appearance settings'
    });
  }
};

// Update notification settings
exports.updateNotifications = async (req, res) => {
  try {
    const settings = req.body;
    const userId = req.user._id;

    // Update notification settings
    await User.findByIdAndUpdate(
      userId,
      {
        'settings.notifications': {
          emailNotifications: settings.emailNotifications,
          pushNotifications: settings.pushNotifications,
          newShare: settings.newShare,
          newComment: settings.newComment,
          mentionNotification: settings.mentionNotification,
          reminderNotification: settings.reminderNotification,
          marketingEmails: settings.marketingEmails
        }
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Notification settings updated'
    });
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update notification settings'
    });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete user
    await User.findByIdAndDelete(userId);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete account'
    });
  }
};
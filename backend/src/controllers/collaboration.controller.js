const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Note = require('../models/note.model');
const User = require('../models/user.model');
const Collaborator = require('../models/collaborator.model');
const sendEmail = require('../utils/sendEmail');

// @desc    Get collaborators for a note
// @route   GET /api/collaboration/:noteId
// @access  Private
exports.getNoteCollaborators = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(new ErrorResponse(`Note not found with id of ${req.params.noteId}`, 404));
  }

  // Check if user is the author of the note
  if (note.author.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to view collaborators for this note`, 401));
  }

  // Get all collaborators for this note
  const collaborators = await Collaborator.find({ noteId: req.params.noteId })
    .populate({
      path: 'userId',
      select: 'id name email avatar'
    });

  // Format the response to match the frontend expectations
  const formattedCollaborators = collaborators.map(collab => ({
    id: collab.userId._id,
    name: collab.userId.name,
    email: collab.userId.email,
    avatar: collab.userId.avatar || '/placeholder.svg',
    permission: collab.permission
  }));

  res.status(200).json({
    success: true,
    count: formattedCollaborators.length,
    data: formattedCollaborators
  });
});

// @desc    Add a collaborator to a note
// @route   POST /api/collaboration/:noteId
// @access  Private
exports.addCollaborator = asyncHandler(async (req, res, next) => {
  const { email, permission } = req.body;
  
  if (!email || !permission) {
    return next(new ErrorResponse('Please provide an email and permission level', 400));
  }

  // Validate permission
  if (!['view', 'comment', 'edit'].includes(permission)) {
    return next(new ErrorResponse('Invalid permission level', 400));
  }

  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(new ErrorResponse(`Note not found with id of ${req.params.noteId}`, 404));
  }

  // Check if user is the author of the note
  if (note.author.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to add collaborators to this note`, 401));
  }

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse(`No user found with email ${email}`, 404));
  }

  // Check if user is trying to add themselves
  if (user._id.toString() === req.user.id) {
    return next(new ErrorResponse(`You cannot add yourself as a collaborator`, 400));
  }

  // Check if the user is already a collaborator
  const existingCollaborator = await Collaborator.findOne({
    noteId: req.params.noteId,
    userId: user._id
  });

  if (existingCollaborator) {
    // Update permission if the user is already a collaborator
    existingCollaborator.permission = permission;
    await existingCollaborator.save();

    const collaborator = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar || '/placeholder.svg',
      permission
    };

    return res.status(200).json({
      success: true,
      message: 'Collaborator permission updated',
      data: collaborator
    });
  }

  // Create a new collaborator
  await Collaborator.create({
    noteId: req.params.noteId,
    userId: user._id,
    permission
  });

  // Update the isShared flag on the note
  note.isShared = true;
  await note.save();

  // Send email notification to the collaborator
  try {
    await sendEmail({
      email: user.email,
      subject: `You've been added as a collaborator on a note`,
      message: `${req.user.name} has added you as a collaborator with ${permission} permission on the note: ${note.title}`
    });
  } catch (err) {
    console.log('Email notification failed', err);
    // Don't return an error, continue even if email fails
  }

  // Format the response to match the frontend expectations
  const collaborator = {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || '/placeholder.svg',
    permission
  };

  res.status(201).json({
    success: true,
    data: collaborator
  });
});

// @desc    Remove a collaborator from a note
// @route   DELETE /api/collaboration/:noteId/:collaboratorId
// @access  Private
exports.removeCollaborator = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.noteId);

  if (!note) {
    return next(new ErrorResponse(`Note not found with id of ${req.params.noteId}`, 404));
  }

  // Check if user is the author of the note
  if (note.author.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to remove collaborators from this note`, 401));
  }

  // Find and remove the collaborator
  const collaborator = await Collaborator.findOneAndDelete({
    noteId: req.params.noteId,
    userId: req.params.collaboratorId
  });

  if (!collaborator) {
    return next(new ErrorResponse(`Collaborator not found`, 404));
  }

  // Check if this was the last collaborator and update isShared flag if so
  const remainingCollaborators = await Collaborator.countDocuments({ noteId: req.params.noteId });
  
  if (remainingCollaborators === 0) {
    note.isShared = false;
    await note.save();
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
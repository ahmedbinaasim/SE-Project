const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Note = require('../models/note.model');
const User = require('../models/user.model');
const Collaborator = require('../models/collaborator.model');
const { generateSummary } = require('../services/ai.service');

// @desc    Get all notes for current user
// @route   GET /api/notes
// @access  Private
exports.getNotes = asyncHandler(async (req, res, next) => {
  // Find all notes where user is author
  const ownedNotes = await Note.find({ author: req.user.id });
  
  // Find all notes where user is a collaborator
  const collaborations = await Collaborator.find({ userId: req.user.id })
    .select('noteId');
  
  const collaborationNoteIds = collaborations.map(collab => collab.noteId);
  
  // Get the actual notes for collaborations
  const collaboratedNotes = await Note.find({
    _id: { $in: collaborationNoteIds }
  }).populate({
    path: 'author',
    select: 'id name email avatar'
  });

  // Combine and sort by updatedAt
  const allNotes = [...ownedNotes, ...collaboratedNotes]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  res.status(200).json({
    success: true,
    count: allNotes.length,
    data: allNotes
  });
});

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id).populate({
    path: 'author',
    select: 'id name email avatar'
  });

  if (!note) {
    return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the note or is a collaborator
  if (note.author._id.toString() !== req.user.id) {
    const isCollaborator = await Collaborator.findOne({
      noteId: note._id,
      userId: req.user.id
    });

    if (!isCollaborator) {
      return next(new ErrorResponse(`Not authorized to access this note`, 401));
    }
  }

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
exports.createNote = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.author = req.user.id;

  const note = await Note.create(req.body);

  res.status(201).json({
    success: true,
    data: note
  });
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
  }

  // Check if user is author or has edit permissions
  if (note.author.toString() !== req.user.id) {
    const collaborator = await Collaborator.findOne({
      noteId: note._id,
      userId: req.user.id
    });

    if (!collaborator || collaborator.permission !== 'edit') {
      return next(new ErrorResponse(`Not authorized to update this note`, 401));
    }
  }

  // Update timestamp
  req.body.updatedAt = Date.now();

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the note
  if (note.author.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to delete this note`, 401));
  }

  // Delete all collaborators associated with this note
  await Collaborator.deleteMany({ noteId: note._id });

  // Delete the note
  await note.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get recent notes
// @route   GET /api/notes/recent
// @access  Private
exports.getRecentNotes = asyncHandler(async (req, res, next) => {
  // Find notes where user is author or collaborator
  const ownedNotes = await Note.find({ author: req.user.id });
  
  const collaborations = await Collaborator.find({ userId: req.user.id })
    .select('noteId');
  
  const collaborationNoteIds = collaborations.map(collab => collab.noteId);
  
  const collaboratedNotes = await Note.find({
    _id: { $in: collaborationNoteIds }
  }).populate({
    path: 'author',
    select: 'id name email avatar'
  });

  // Combine, sort by updatedAt, and take only the 3 most recent
  const recentNotes = [...ownedNotes, ...collaboratedNotes]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  res.status(200).json({
    success: true,
    count: recentNotes.length,
    data: recentNotes
  });
});

// @desc    Get favorite notes
// @route   GET /api/notes/favorites
// @access  Private
exports.getFavoriteNotes = asyncHandler(async (req, res, next) => {
  const favoriteNotes = await Note.find({
    author: req.user.id,
    isFavorite: true
  }).populate({
    path: 'author',
    select: 'id name email avatar'
  });

  res.status(200).json({
    success: true,
    count: favoriteNotes.length,
    data: favoriteNotes
  });
});

// @desc    Toggle favorite status
// @route   PUT /api/notes/:id/favorite
// @access  Private
exports.toggleFavorite = asyncHandler(async (req, res, next) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
  }

  // Make sure user owns the note
  if (note.author.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not authorized to favorite this note`, 401));
  }

  // Toggle the favorite status
  note.isFavorite = !note.isFavorite;
  await note.save();

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Get shared notes
// @route   GET /api/notes/shared
// @access  Private
exports.getSharedNotes = asyncHandler(async (req, res, next) => {
  // Find notes shared with the user (where user is a collaborator)
  const collaborations = await Collaborator.find({ userId: req.user.id })
    .select('noteId');
  
  const collaborationNoteIds = collaborations.map(collab => collab.noteId);
  
  const sharedNotes = await Note.find({
    _id: { $in: collaborationNoteIds }
  }).populate({
    path: 'author',
    select: 'id name email avatar'
  });

  res.status(200).json({
    success: true,
    count: sharedNotes.length,
    data: sharedNotes
  });
});

// @desc    Get notes shared by me
// @route   GET /api/notes/shared-by-me
// @access  Private
exports.getSharedByMeNotes = asyncHandler(async (req, res, next) => {
  // Find notes where user is the author and isShared is true
  const sharedByMeNotes = await Note.find({
    author: req.user.id,
    isShared: true
  }).populate({
    path: 'author',
    select: 'id name email avatar'
  });

  res.status(200).json({
    success: true,
    count: sharedByMeNotes.length,
    data: sharedByMeNotes
  });
});

// @desc    Generate AI summary for note
// @route   POST /api/notes/:id/summary
// @access  Private
exports.generateNoteSummary = asyncHandler(async (req, res, next) => {
    const note = await Note.findById(req.params.id);
  
    if (!note) {
      return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
    }
  
    // Check if user is author or has view permissions at minimum
    if (note.author.toString() !== req.user.id) {
      const collaborator = await Collaborator.findOne({
        noteId: note._id,
        userId: req.user.id
      });
  
      if (!collaborator) {
        return next(new ErrorResponse(`Not authorized to access this note`, 401));
      }
    }
  
    try {
      // Call AI service to generate summaries
      const { summary, detailedSummary, bulletPoints } = await generateSummary(note.content);
  
      // Update the note with the generated summaries
      note.summary = summary;
      note.detailedSummary = detailedSummary;
      note.bulletPoints = bulletPoints;
      note.hasSummary = true;
      note.updatedAt = Date.now();
  
      await note.save();
  
      res.status(200).json({
        success: true,
        data: note
      });
    } catch (err) {
      console.error('AI Summary Generation Error:', err);
      return next(new ErrorResponse('Failed to generate summary. Please try again later.', 500));
    }
  });
  
  // @desc    Share a note
  // @route   PUT /api/notes/:id/share
  // @access  Private
  exports.toggleShareNote = asyncHandler(async (req, res, next) => {
    let note = await Note.findById(req.params.id);
  
    if (!note) {
      return next(new ErrorResponse(`Note not found with id of ${req.params.id}`, 404));
    }
  
    // Make sure user owns the note
    if (note.author.toString() !== req.user.id) {
      return next(new ErrorResponse(`Not authorized to share this note`, 401));
    }
  
    // Toggle the shared status
    note.isShared = !note.isShared;
    await note.save();
  
    res.status(200).json({
      success: true,
      data: note
    });
  });
  
  // @desc    Get notes by tag
  // @route   GET /api/notes/tags/:tag
  // @access  Private
  exports.getNotesByTag = asyncHandler(async (req, res, next) => {
    const { tag } = req.params;
    
    // Find notes with the specified tag where user is author
    const ownedNotes = await Note.find({ 
      author: req.user.id,
      tags: { $in: [tag] }
    });
    
    // Find notes where user is a collaborator
    const collaborations = await Collaborator.find({ userId: req.user.id })
      .select('noteId');
    
    const collaborationNoteIds = collaborations.map(collab => collab.noteId);
    
    // Get the collaborated notes with the specified tag
    const collaboratedNotes = await Note.find({
      _id: { $in: collaborationNoteIds },
      tags: { $in: [tag] }
    }).populate({
      path: 'author',
      select: 'id name email avatar'
    });
  
    // Combine and sort by updatedAt
    const taggedNotes = [...ownedNotes, ...collaboratedNotes]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
    res.status(200).json({
      success: true,
      count: taggedNotes.length,
      data: taggedNotes
    });
  });
  
  // @desc    Get all unique tags
  // @route   GET /api/notes/tags
  // @access  Private
  exports.getAllTags = asyncHandler(async (req, res, next) => {
    // Find all notes where user is author
    const ownedNotes = await Note.find({ author: req.user.id });
    
    // Find all notes where user is a collaborator
    const collaborations = await Collaborator.find({ userId: req.user.id })
      .select('noteId');
    
    const collaborationNoteIds = collaborations.map(collab => collab.noteId);
    
    const collaboratedNotes = await Note.find({
      _id: { $in: collaborationNoteIds }
    });
  
    // Combine all notes and extract unique tags
    const allNotes = [...ownedNotes, ...collaboratedNotes];
    const allTags = allNotes.reduce((tags, note) => {
      return [...tags, ...note.tags];
    }, []);
    
    // Remove duplicates and sort alphabetically
    const uniqueTags = [...new Set(allTags)].sort();
  
    res.status(200).json({
      success: true,
      count: uniqueTags.length,
      data: uniqueTags
    });
  });
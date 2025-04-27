const Note = require('../models/noteModel');
const User = require('../models/userModel');

// Get all notes for a user
exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Build query based on filter parameters
    const queryObj = { owner: userId };
    
    // Filter by search term
    if (req.query.search) {
      queryObj.$text = { $search: req.query.search };
    }
    
    // Filter by favorites only
    if (req.query.favorites === 'true') {
      queryObj.isFavorite = true;
    }
    
    // Filter by folder
    if (req.query.folder && req.query.folder !== 'all') {
      queryObj.folderId = req.query.folder;
    } else if (req.query.folder === 'all') {
      // Include notes with no folder (null) or any folder
    } else {
      // Default to notes with no folder
      queryObj.folderId = null;
    }
    
    // Filter by date range
    if (req.query.days) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(req.query.days, 10));
      queryObj.updatedAt = { $gte: daysAgo };
    }
    
    // Execute query
    const notes = await Note.find(queryObj).sort({ updatedAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: notes.length,
      data: {
        notes
      }
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch notes'
    });
  }
};

// Get shared notes for a user
exports.getSharedNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find notes where the user is a collaborator
    const sharedNotes = await Note.find({
      'collaborators.user': userId
    }).populate({
      path: 'owner',
      select: 'name email avatar'
    });
    
    res.status(200).json({
      status: 'success',
      results: sharedNotes.length,
      data: {
        notes: sharedNotes
      }
    });
  } catch (error) {
    console.error('Error fetching shared notes:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch shared notes'
    });
  }
};

// Get notes shared by the user
exports.getSharedByMeNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find notes owned by the user that have collaborators
    const sharedByMeNotes = await Note.find({
      owner: userId,
      isShared: true
    }).populate({
      path: 'collaborators.user',
      select: 'name email avatar'
    });
    
    res.status(200).json({
      status: 'success',
      results: sharedByMeNotes.length,
      data: {
        notes: sharedByMeNotes
      }
    });
  } catch (error) {
    console.error('Error fetching notes shared by user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch notes shared by you'
    });
  }
};

// Get a specific note by ID
exports.getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    
    const note = await Note.findById(noteId).populate({
      path: 'collaborators.user',
      select: 'name email avatar'
    });
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if the user is the owner or a collaborator
    if (!note.owner.equals(userId) && 
        !note.collaborators.some(collab => collab.user._id.equals(userId))) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to access this note'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        note
      }
    });
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch note'
    });
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, contentHtml, tags, folderId } = req.body;
    const userId = req.user._id;
    
    const newNote = await Note.create({
      title,
      content,
      contentHtml,
      tags: tags || [],
      folderId: folderId || null,
      owner: userId
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        note: newNote
      }
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create note'
    });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    const allowedFields = ['title', 'content', 'contentHtml', 'tags', 'folderId'];
    
    // Filter out unwanted fields
    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = req.body[key];
      }
    });
    
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if user is owner or has edit permission
    if (!note.owner.equals(userId) && 
        !note.collaborators.some(collab => 
          collab.user.equals(userId) && collab.permission === 'edit')) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to edit this note'
      });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        note: updatedNote
      }
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update note'
    });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Only the owner can delete a note
    if (!note.owner.equals(userId)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete this note'
      });
    }
    
    await Note.findByIdAndDelete(noteId);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete note'
    });
  }
};

// Toggle favorite status
exports.toggleFavorite = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if the user is the owner
    if (!note.owner.equals(userId)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to favorite this note'
      });
    }
    
    // Toggle favorite status
    note.isFavorite = !note.isFavorite;
    await note.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        note
      }
    });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update favorite status'
    });
  }
};

// Export note (for downloading)
exports.exportNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if user has access to this note
    if (!note.owner.equals(userId) && 
        !note.collaborators.some(collab => collab.user.equals(userId))) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to export this note'
      });
    }
    
    // Format the note for export (e.g., as markdown or HTML)
    const exportData = {
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      tags: note.tags,
      folderId: note.folderId
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        exportData
      }
    });
  } catch (error) {
    console.error('Error exporting note:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to export note'
    });
  }
};
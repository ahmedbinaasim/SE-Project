const Note = require('../models/noteModel');
const User = require('../models/userModel');
const { sendCollaborationEmail } = require('../utils/email');

// Validate email format
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Get all collaborators for a note
exports.getNoteCollaborators = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    
    const note = await Note.findById(noteId)
      .populate({
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
        message: 'You do not have permission to view this note\'s collaborators'
      });
    }
    
    const collaborators = note.collaborators.map(collab => ({
      id: collab._id,
      user: {
        id: collab.user._id,
        name: collab.user.name,
        email: collab.user.email,
        avatar: collab.user.avatar
      },
      permission: collab.permission,
      addedAt: collab.addedAt
    }));
    
    res.status(200).json({
      status: 'success',
      data: {
        collaborators
      }
    });
  } catch (error) {
    console.error('Error fetching collaborators:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch collaborators'
    });
  }
};

// Add a collaborator to a note
exports.addCollaborator = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    const { email, permission } = req.body;
    
    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email address'
      });
    }
    
    // Verify permission is valid
    if (!['view', 'comment', 'edit'].includes(permission)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid permission level. Must be "view", "comment", or "edit".'
      });
    }
    
    // Find the user to add as collaborator
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found with that email'
      });
    }
    
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if the current user is the owner
    if (!note.owner.equals(userId)) {
      return res.status(403).json({
        status: 'fail',
        message: 'Only the owner can add collaborators'
      });
    }
    
    // Check if user is already a collaborator
    if (note.collaborators.some(collab => collab.user.equals(userToAdd._id))) {
      return res.status(400).json({
        status: 'fail',
        message: 'User is already a collaborator on this note'
      });
    }
    
    // Don't add the owner as a collaborator
    if (note.owner.equals(userToAdd._id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Cannot add the owner as a collaborator'
      });
    }
    
    // Add the collaborator
    note.collaborators.push({
      user: userToAdd._id,
      permission
    });
    
    // Mark note as shared
    note.isShared = true;
    
    await note.save();
    
    // Send email notification to the new collaborator
    await sendCollaborationEmail(
      userToAdd, 
      req.user, 
      note, 
      permission
    );
    
    // Return the newly added collaborator
    const collaborator = {
      id: note.collaborators[note.collaborators.length - 1]._id,
      user: {
        id: userToAdd._id,
        name: userToAdd.name,
        email: userToAdd.email,
        avatar: userToAdd.avatar
      },
      permission,
      addedAt: new Date()
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        collaborator
      }
    });
  } catch (error) {
    console.error('Error adding collaborator:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add collaborator'
    });
  }
};

// Remove a collaborator from a note
exports.removeCollaborator = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const collaboratorId = req.params.collaboratorId;
    const userId = req.user._id;
    
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if the current user is the owner
    if (!note.owner.equals(userId)) {
      return res.status(403).json({
        status: 'fail',
        message: 'Only the owner can remove collaborators'
      });
    }
    
    // Remove the collaborator
    note.collaborators = note.collaborators.filter(
      collab => !collab._id.equals(collaboratorId)
    );
    
    // If no collaborators left, mark as not shared
    if (note.collaborators.length === 0) {
      note.isShared = false;
    }
    
    await note.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Collaborator removed successfully'
    });
  } catch (error) {
    console.error('Error removing collaborator:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to remove collaborator'
    });
  }
};

// Update a collaborator's permission
exports.updateCollaboratorPermission = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const collaboratorId = req.params.collaboratorId;
    const { permission } = req.body;
    const userId = req.user._id;
    
    // Verify permission is valid
    if (!['view', 'comment', 'edit'].includes(permission)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid permission level. Must be "view", "comment", or "edit".'
      });
    }
    
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
    
    // Check if the current user is the owner
    if (!note.owner.equals(userId)) {
      return res.status(403).json({
        status: 'fail',
        message: 'Only the owner can update collaborator permissions'
      });
    }
    
    // Find the collaborator
    const collaborator = note.collaborators.id(collaboratorId);
    
    if (!collaborator) {
      return res.status(404).json({
        status: 'fail',
        message: 'Collaborator not found'
      });
    }
    
    // Update the permission
    collaborator.permission = permission;
    await note.save();
    
    // Format the response
    const updatedCollaborator = {
      id: collaborator._id,
      user: {
        id: collaborator.user._id,
        name: collaborator.user.name,
        email: collaborator.user.email,
        avatar: collaborator.user.avatar
      },
      permission: collaborator.permission,
      addedAt: collaborator.addedAt
    };
    
    res.status(200).json({
      status: 'success',
      data: {
        collaborator: updatedCollaborator
      }
    });
  } catch (error) {
    console.error('Error updating collaborator permission:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update collaborator permission'
    });
  }
};
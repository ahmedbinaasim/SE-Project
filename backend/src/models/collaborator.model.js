const mongoose = require('mongoose');

const CollaboratorSchema = new mongoose.Schema({
  noteId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Note',
    required: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  permission: {
    type: String,
    enum: ['view', 'comment', 'edit'],
    default: 'view',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate collaborators on the same note
CollaboratorSchema.index({ noteId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
const express = require('express');
const {
  getNoteCollaborators,
  addCollaborator,
  removeCollaborator
} = require('../controllers/collaboration.controller');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(protect);

// Get collaborators for a note & add new collaborator
router.route('/:noteId')
  .get(getNoteCollaborators)
  .post(addCollaborator);

// Remove a collaborator
router.delete('/:noteId/:collaboratorId', removeCollaborator);

module.exports = router;
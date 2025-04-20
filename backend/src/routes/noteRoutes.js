const express = require('express');
const noteController = require('../controllers/noteController');
const summaryController = require('../controllers/summaryController');
const collaborationController = require('../controllers/collaborationController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Note CRUD operations
router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.get('/shared', noteController.getSharedNotes);
router.get('/shared-by-me', noteController.getSharedByMeNotes);
router.get('/:id', noteController.getNoteById);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

// Note actions
router.patch('/:id/favorite', noteController.toggleFavorite);
router.get('/:id/export', noteController.exportNote);

// Summary operations
router.post('/:id/summary', summaryController.generateSummary);
router.get('/:id/summary', summaryController.getSummary);

// Collaboration operations
router.get('/:id/collaborators', collaborationController.getNoteCollaborators);
router.post('/:id/collaborators', collaborationController.addCollaborator);
router.delete('/:noteId/collaborators/:collaboratorId', collaborationController.removeCollaborator);
router.patch('/:noteId/collaborators/:collaboratorId', collaborationController.updateCollaboratorPermission);

module.exports = router;
const express = require('express');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  getRecentNotes,
  getFavoriteNotes,
  toggleFavorite,
  getSharedNotes,
  getSharedByMeNotes,
  generateNoteSummary,
  toggleShareNote,
  getNotesByTag,
  getAllTags
} = require('../controllers/notes.controller');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(protect);

// Special routes
router.get('/recent', getRecentNotes);
router.get('/favorites', getFavoriteNotes);
router.get('/shared', getSharedNotes);
router.get('/shared-by-me', getSharedByMeNotes);
router.get('/tags', getAllTags);
router.get('/tags/:tag', getNotesByTag);

// Basic CRUD routes
router.route('/')
  .get(getNotes)
  .post(createNote);

router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

// Toggle routes
router.put('/:id/favorite', toggleFavorite);
router.put('/:id/share', toggleShareNote);

// AI summary generation
router.post('/:id/summary', generateNoteSummary);

module.exports = router;
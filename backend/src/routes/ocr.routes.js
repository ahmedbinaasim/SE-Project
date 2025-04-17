const express = require('express');
const {
  processOcrImage,
  saveOcrAsNote
} = require('../controllers/ocr.controller');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(protect);

// Process an image with OCR
router.post('/process', processOcrImage);

// Save OCR text as a note
router.post('/save', saveOcrAsNote);

module.exports = router;
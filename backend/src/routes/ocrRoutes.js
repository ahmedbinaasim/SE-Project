const express = require('express');
const ocrController = require('../controllers/ocrController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// OCR operations
router.post('/process', ocrController.processOcr);
router.get('/results', ocrController.getOcrResults);
router.post('/save', ocrController.saveOcrAsNote);

module.exports = router;
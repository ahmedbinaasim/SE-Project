const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { processImage } = require('../services/ocr.service');
const Note = require('../models/note.model');

// @desc    Process an image with OCR
// @route   POST /api/ocr/process
// @access  Private
exports.processOcrImage = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  const file = req.files.image;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400));
  }

  // Check file size (limit to 10MB)
  if (file.size > process.env.MAX_FILE_UPLOAD || file.size > 10000000) {
    return next(new ErrorResponse('Please upload an image less than 10MB', 400));
  }

  try {
    // Process the image with OCR
    const text = await processImage(file.data);

    res.status(200).json({
      success: true,
      data: { text }
    });
  } catch (err) {
    console.error('OCR Processing Error:', err);
    return next(new ErrorResponse('Error processing image. Please try again.', 500));
  }
});

// @desc    Save OCR text as a note
// @route   POST /api/ocr/save
// @access  Private
exports.saveOcrAsNote = asyncHandler(async (req, res, next) => {
  const { text, title } = req.body;

  if (!text) {
    return next(new ErrorResponse('Please provide the OCR text', 400));
  }

  // Create a note with the OCR text
  const note = await Note.create({
    title: title || 'OCR Note - ' + new Date().toLocaleString(),
    content: text,
    author: req.user.id,
    tags: ['OCR']
  });

  res.status(201).json({
    success: true,
    data: note
  });
});
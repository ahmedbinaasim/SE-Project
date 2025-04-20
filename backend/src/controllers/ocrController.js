const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { createWorker } = require('tesseract.js');
const Note = require('../models/noteModel');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'ocr-' + uniqueSuffix + ext);
  }
});

// Create multer upload instance
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images and PDFs
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only images (JPEG, PNG) and PDFs are allowed'), false);
    }
    cb(null, true);
  }
});

// Store OCR results temporarily
const ocrResults = new Map();

// Process OCR on an uploaded image
exports.processOcr = async (req, res) => {
  try {
    // Use multer upload middleware
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          status: 'fail',
          message: err.message || 'Error uploading file'
        });
      }
      
      if (!req.file) {
        return res.status(400).json({
          status: 'fail',
          message: 'No file uploaded'
        });
      }
      
      const userId = req.user._id;
      const filePath = req.file.path;
      
      try {
        // Initialize tesseract worker
        const worker = await createWorker();
        
        // Recognize text from image
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data } = await worker.recognize(filePath);
        await worker.terminate();
        
        // Store OCR result for this user
        ocrResults.set(userId.toString(), data.text);
        
        // Clean up the uploaded file
        fs.unlinkSync(filePath);
        
        res.status(200).json({
          status: 'success',
          data: {
            text: data.text
          }
        });
      } catch (ocrError) {
        // Clean up the uploaded file in case of error
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        
        console.error('OCR processing error:', ocrError);
        res.status(500).json({
          status: 'error',
          message: 'Failed to process OCR'
        });
      }
    });
  } catch (error) {
    console.error('OCR controller error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process OCR request'
    });
  }
};

// Get OCR results for a user
exports.getOcrResults = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    
    if (!ocrResults.has(userId)) {
      return res.status(404).json({
        status: 'fail',
        message: 'No OCR results found. Please process a document first.'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        text: ocrResults.get(userId)
      }
    });
  } catch (error) {
    console.error('Error fetching OCR results:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch OCR results'
    });
  }
};

// Save OCR results as a note
exports.saveOcrAsNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { text, title } = req.body;
    
    if (!text) {
      return res.status(400).json({
        status: 'fail',
        message: 'No text provided to save'
      });
    }
    
    // Create a new note with the OCR text
    const newNote = await Note.create({
      title: title || 'OCR Document',
      content: text,
      owner: userId,
      tags: ['ocr']
    });
    
    // Clear the OCR results for this user
    ocrResults.delete(userId.toString());
    
    res.status(201).json({
      status: 'success',
      data: {
        note: newNote
      }
    });
  } catch (error) {
    console.error('Error saving OCR as note:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to save OCR text as note'
    });
  }
};
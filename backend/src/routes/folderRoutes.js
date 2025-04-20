const express = require('express');
const folderController = require('../controllers/folderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with authentication
router.use(authMiddleware.protect);

router
  .route('/')
  .get(folderController.getAllFolders)
  .post(folderController.createFolder);

module.exports = router;
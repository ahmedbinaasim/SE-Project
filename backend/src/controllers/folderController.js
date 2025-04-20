const Folder = require('../models/folderModel');

// Create a new folder
exports.createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;

    // Check if folder already exists for this user
    const existingFolder = await Folder.findOne({ name, owner: userId });
    if (existingFolder) {
      return res.status(400).json({
        status: 'fail',
        message: 'A folder with this name already exists',
      });
    }

    const newFolder = await Folder.create({
      name,
      owner: userId,
    });

    res.status(201).json({
      status: 'success',
      data: {
        folder: newFolder,
      },
    });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create folder',
    });
  }
};

// Get all folders for a user
exports.getAllFolders = async (req, res) => {
  try {
    const userId = req.user._id;

    const folders = await Folder.find({ owner: userId }).sort({ name: 1 });

    res.status(200).json({
      status: 'success',
      results: folders.length,
      data: {
        folders,
      },
    });
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch folders',
    });
  }
};
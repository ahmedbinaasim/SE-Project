const Note = require('../models/noteModel');
const User = require('../models/userModel');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get total notes count
    const totalNotes = await Note.countDocuments({ owner: userId });
    
    // Get notes created/updated in the last week
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const newNotesLastWeek = await Note.countDocuments({ 
      owner: userId,
      createdAt: { $gte: lastWeek }
    });
    
    // Get number of collaborators (unique users the current user shares notes with)
    const sharedNotes = await Note.find({ 
      owner: userId,
      isShared: true
    });
    
    // Extract all collaborator user IDs
    const collaboratorIds = new Set();
    sharedNotes.forEach(note => {
      note.collaborators.forEach(collab => {
        collaboratorIds.add(collab.user.toString());
      });
    });
    
    // Get number of AI summaries
    const aiSummaries = await Note.countDocuments({
      owner: userId,
      hasSummary: true
    });
    
    // New AI summaries in the last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const newAiSummariesLastMonth = await Note.countDocuments({
      owner: userId,
      hasSummary: true,
      updatedAt: { $gte: lastMonth }
    });
    
    // Return statistics
    res.status(200).json({
      status: 'success',
      data: {
        totalNotes,
        newNotesLastWeek,
        collaboratorsCount: collaboratorIds.size,
        aiSummaries,
        newAiSummariesLastMonth,
        // Placeholder for study time since we don't track it yet
        studyTime: 32
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

// Get recent notes
exports.getRecentNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit || 5, 10);
    
    // Get most recently updated notes
    const recentNotes = await Note.find({ owner: userId })
      .sort({ updatedAt: -1 })
      .limit(limit);
    
    res.status(200).json({
      status: 'success',
      data: {
        notes: recentNotes
      }
    });
  } catch (error) {
    console.error('Error fetching recent notes:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch recent notes'
    });
  }
};

// Get favorite notes
exports.getFavoriteNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit || 5, 10);
    
    // Get favorite notes
    const favoriteNotes = await Note.find({ 
      owner: userId,
      isFavorite: true
    })
      .sort({ updatedAt: -1 })
      .limit(limit);
    
    res.status(200).json({
      status: 'success',
      data: {
        notes: favoriteNotes
      }
    });
  } catch (error) {
    console.error('Error fetching favorite notes:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch favorite notes'
    });
  }
};
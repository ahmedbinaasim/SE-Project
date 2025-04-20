// const Note = require('../models/noteModel');
// const { generateAISummary } = require('../services/ai-service');

// // Generate summary for a note
// exports.generateSummary = async (req, res) => {
//   try {
//     const noteId = req.params.id;
//     const userId = req.user._id;
    
//     const note = await Note.findById(noteId);
    
//     if (!note) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Note not found'
//       });
//     }
    
//     // Check if user has access to this note
//     if (!note.owner.equals(userId) && 
//         !note.collaborators.some(collab => collab.user.equals(userId))) {
//       return res.status(403).json({
//         status: 'fail',
//         message: 'You do not have permission to access this note'
//       });
//     }
    
//     // Generate summary using AI service
//     const summaryData = await generateAISummary(note.content);
    
//     // Update note with summaries
//     note.summary = summaryData.conciseSummary;
//     note.detailedSummary = summaryData.detailedSummary;
//     note.bulletPoints = summaryData.bulletPoints;
//     note.hasSummary = true;
    
//     await note.save();
    
//     res.status(200).json({
//       status: 'success',
//       data: {
//         summary: {
//           concise: summaryData.conciseSummary,
//           detailed: summaryData.detailedSummary,
//           bulletPoints: summaryData.bulletPoints
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error generating summary:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Failed to generate summary'
//     });
//   }
// };

// // Get summary for a note
// exports.getSummary = async (req, res) => {
//   try {
//     const noteId = req.params.id;
//     const userId = req.user._id;
    
//     const note = await Note.findById(noteId);
    
//     if (!note) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Note not found'
//       });
//     }
    
//     // Check if user has access to this note
//     if (!note.owner.equals(userId) && 
//         !note.collaborators.some(collab => collab.user.equals(userId))) {
//       return res.status(403).json({
//         status: 'fail',
//         message: 'You do not have permission to access this note'
//       });
//     }
    
//     // Check if summary exists
//     if (!note.hasSummary) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'This note does not have a summary yet'
//       });
//     }
    
//     res.status(200).json({
//       status: 'success',
//       data: {
//         summary: {
//           concise: note.summary,
//           detailed: note.detailedSummary,
//           bulletPoints: note.bulletPoints
//         }
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching summary:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Failed to fetch summary'
//     });
//   }
// };

const Note = require('../models/noteModel');
const { generateAISummary } = require('../services/ai-service');

// Generate summary for a note
exports.generateSummary = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    
    console.log(`Generating summary for note: ${noteId}, User: ${userId}`);
    
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if user has access to this note
    if (!note.owner.equals(userId) && 
        !note.collaborators.some(collab => collab.user.equals(userId))) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to access this note'
      });
    }
    
    // Generate summary using AI service
    console.log("Calling AI service to generate summary...");
    const summaryData = await generateAISummary(note.content);
    console.log("Summary generated successfully, updating note...");
    
    // Update note with summaries
    note.summary = summaryData.conciseSummary;
    note.detailedSummary = summaryData.detailedSummary;
    note.bulletPoints = summaryData.bulletPoints;
    note.hasSummary = true;
    
    await note.save();
    console.log("Note updated with new summary");
    
    res.status(200).json({
      status: 'success',
      data: {
        summary: {
          concise: summaryData.conciseSummary,
          detailed: summaryData.detailedSummary,
          bulletPoints: summaryData.bulletPoints
        }
      }
    });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate summary: ' + (error.message || 'Unknown error')
    });
  }
};

// Get summary for a note
exports.getSummary = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user._id;
    
    console.log(`Fetching summary for note: ${noteId}, User: ${userId}`);
    
    const note = await Note.findById(noteId);
    
    if (!note) {
      return res.status(404).json({
        status: 'fail',
        message: 'Note not found'
      });
    }
    
    // Check if user has access to this note
    if (!note.owner.equals(userId) && 
        !note.collaborators.some(collab => collab.user.equals(userId))) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to access this note'
      });
    }
    
    // Check if summary exists
    if (!note.hasSummary) {
      return res.status(404).json({
        status: 'fail',
        message: 'This note does not have a summary yet'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        summary: {
          concise: note.summary,
          detailed: note.detailedSummary,
          bulletPoints: note.bulletPoints
        }
      }
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch summary: ' + (error.message || 'Unknown error')
    });
  }
};
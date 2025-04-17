const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  contentHtml: {
    type: String
  },
  summary: {
    type: String
  },
  detailedSummary: {
    type: String
  },
  bulletPoints: {
    type: [String]
  },
  tags: {
    type: [String],
    default: []
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  isShared: {
    type: Boolean,
    default: false
  },
  hasSummary: {
    type: Boolean,
    default: false
  },
  folder: {
    type: String
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before save
NoteSchema.pre('save', function(next) {
  if (this.isModified('content') || this.isModified('title')) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Note', NoteSchema);
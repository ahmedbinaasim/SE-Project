const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true
  },
  content: {
    type: String,
    required: [true, 'Summary content is required']
  },
  length: {
    type: String,
    enum: ['short', 'medium', 'long'],
    default: 'medium'
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
SummarySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Summary', SummarySchema);
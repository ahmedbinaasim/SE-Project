const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a folder name'],
      trim: true,
      unique: true,
      maxlength: [50, 'Folder name cannot exceed 50 characters'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Folder must belong to a user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for efficient querying
folderSchema.index({ owner: 1, name: 1 }, { unique: true });

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
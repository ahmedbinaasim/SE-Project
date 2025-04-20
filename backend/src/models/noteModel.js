// const mongoose = require('mongoose');

// const noteSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Please provide a title'],
//       trim: true
//     },
//     content: {
//       type: String,
//       required: [true, 'Note content cannot be empty']
//     },
//     contentHtml: {
//       type: String,
//       default: ''
//     },
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: [true, 'Note must belong to a user']
//     },
//     tags: {
//       type: [String],
//       default: []
//     },
//     isFavorite: {
//       type: Boolean,
//       default: false
//     },
//     hasSummary: {
//       type: Boolean,
//       default: false
//     },
//     summary: {
//       type: String,
//       default: ''
//     },
//     detailedSummary: {
//       type: String,
//       default: ''
//     },
//     bulletPoints: {
//       type: [String],
//       default: []
//     },
//     isShared: {
//       type: Boolean,
//       default: false
//     },
//     collaborators: [
//       {
//         user: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'User'
//         },
//         permission: {
//           type: String,
//           enum: ['view', 'comment', 'edit'],
//           default: 'view'
//         },
//         addedAt: {
//           type: Date,
//           default: Date.now
//         }
//       }
//     ]
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Add index for efficient querying
// noteSchema.index({ owner: 1 });
// noteSchema.index({ tags: 1 });
// noteSchema.index({ title: 'text', content: 'text' });

// const Note = mongoose.model('Note', noteSchema);

// module.exports = Note;
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Note content cannot be empty']
    },
    contentHtml: {
      type: String,
      default: ''
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Note must belong to a user']
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      default: null
    },
    tags: {
      type: [String],
      default: []
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    hasSummary: {
      type: Boolean,
      default: false
    },
    summary: {
      type: String,
      default: ''
    },
    detailedSummary: {
      type: String,
      default: ''
    },
    bulletPoints: {
      type: [String],
      default: []
    },
    isShared: {
      type: Boolean,
      default: false
    },
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        permission: {
          type: String,
          enum: ['view', 'comment', 'edit'],
          default: 'view'
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add index for efficient querying
noteSchema.index({ owner: 1 });
noteSchema.index({ tags: 1 });
noteSchema.index({ title: 'text', content: 'text' });
noteSchema.index({ folderId: 1 });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
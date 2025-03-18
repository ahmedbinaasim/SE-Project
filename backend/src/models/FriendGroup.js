const mongoose = require('mongoose');

const FriendGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a group name'],
    trim: true,
    maxlength: [50, 'Group name cannot be more than 50 characters']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters']
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

// Set the owner as the first member with 'owner' role
FriendGroupSchema.pre('save', function(next) {
  // Only run on first save
  if (this.isNew) {
    // Check if owner is already a member
    const ownerExists = this.members.some(
      member => member.user.toString() === this.owner.toString()
    );
    
    // If not, add owner as a member with 'owner' role
    if (!ownerExists) {
      this.members.unshift({
        user: this.owner,
        role: 'owner',
        joinedAt: Date.now()
      });
    }
  }
  
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('FriendGroup', FriendGroupSchema);
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const validator = require('validator');

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please provide your name'],
//       trim: true
//     },
//     email: {
//       type: String,
//       required: [true, 'Please provide your email'],
//       unique: true,
//       lowercase: true,
//       validate: [validator.isEmail, 'Please provide a valid email']
//     },
//     password: {
//       type: String,
//       required: [true, 'Please provide a password'],
//       minlength: 8,
//       select: false
//     },
//     avatar: {
//       type: String,
//       default: '/placeholder.svg'
//     },
//     passwordResetToken: String,
//     passwordResetExpires: Date,
//     emailVerified: {
//       type: Boolean,
//       default: false
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now
//     }
//   }
// );

// // Pre-save hook to hash the password
// userSchema.pre('save', async function(next) {
//   // Only hash the password if it's modified
//   if (!this.isModified('password')) return next();
  
//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
  
//   next();
// });

// // Method to check if password is correct
// userSchema.methods.isPasswordCorrect = async function(candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    avatar: {
      type: String,
      default: '/placeholder.svg'
    },
    bio: {
      type: String,
      default: ''
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    settings: {
      appearance: {
        theme: {
          type: String,
          enum: ['light', 'dark', 'system'],
          default: 'system'
        },
        fontSize: {
          type: String,
          enum: ['small', 'normal', 'large'],
          default: 'normal'
        }
      },
      notifications: {
        emailNotifications: {
          type: Boolean,
          default: true
        },
        pushNotifications: {
          type: Boolean,
          default: false
        },
        newShare: {
          type: Boolean,
          default: true
        },
        newComment: {
          type: Boolean,
          default: true
        },
        mentionNotification: {
          type: Boolean,
          default: true
        },
        reminderNotification: {
          type: Boolean,
          default: true
        },
        marketingEmails: {
          type: Boolean,
          default: false
        }
      }
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerified: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified
  if (!this.isModified('password')) return next();
  
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  
  next();
});

// Method to check if password is correct
userSchema.methods.isPasswordCorrect = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
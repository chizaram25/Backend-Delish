const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    return next();

    }  this.password = await bcrypt.hash(this.password, salt);
    next();
  }
);
 const User = mongoose.model('User', userSchema);
module.exports = User;

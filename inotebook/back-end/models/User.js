const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', UserSchema);
// User.createIndexes().then(() => console.log("Indexes created for User model")).catch(err => console.log("Error creating indexes for User model:", err));
module.exports = User;

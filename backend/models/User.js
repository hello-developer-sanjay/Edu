const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
 
  password: { type: String, required: true }, // Add password field
});

module.exports = mongoose.model('User', userSchema);

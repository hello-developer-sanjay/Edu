const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile'); // Import UserProfile model

router.post('/', async (req, res) => {
  const { username, email, password, firstName, lastName, bio, profileImage } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Create a user profile for the new user with additional information
    const newUserProfile = new UserProfile({
      user: newUser._id,
      username,
      email,
      firstName,
      lastName,
      bio,
      profileImage,
    });

    await newUserProfile.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

module.exports = router;

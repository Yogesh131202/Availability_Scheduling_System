const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // User already exists
      return res.status(400).json({
        message: 'User already exists',
        token: generateToken(existingUser), // Optionally send the token if needed for auto-login
        userId: existingUser.id, // Optionally send the userId if needed for auto-login
      });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: 'user' }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ token, user: { email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error during user signup', error });
  }
});

// User Signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token, user: { email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error during user signin', error });
  }
});

module.exports = router;

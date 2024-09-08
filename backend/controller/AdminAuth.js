const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// Admin Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id, role: 'admin' }, 'your-secret-key', { expiresIn: '1h' });
    res.status(201).json({ token, admin: { email: newAdmin.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error during admin signup', error });
  }
});

// Admin Signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token, admin: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error during admin signin', error });
  }
});

module.exports = router;

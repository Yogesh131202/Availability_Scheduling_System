const express = require('express');
const Availability = require('../models/Availability');
const router = express.Router();

// POST route for adding user availability
router.post('/availability', async (req, res) => {
  const { email, date, availability } = req.body;
  try {
    const newAvailability = new Availability({ email, date, availability });
    await newAvailability.save();
    res.status(201).send('Availability saved');
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route for fetching all users' availability
router.get('/admin/availability', async (req, res) => {
  try {
    const availabilities = await Availability.find();
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

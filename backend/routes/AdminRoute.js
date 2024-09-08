const express = require('express');
const Availability = require('../models/Availability');
const auth = require('../controller/AdminAuth'); // Middleware for Admin auth

const router = express.Router();

// Get all users' availability
router.get('/availability', authAdmin, async (req, res) => {
  try {
    const availability = await Availability.find().populate('userId', 'email'); // Populate user email
    res.json(availability);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Admin schedules a session for a user
router.post('/schedule', authAdmin, async (req, res) => {
  const { userId, day, startTime, endTime, duration } = req.body;

  try {
    const availability = await Availability.findOne({ userId, day, startTime, endTime });
    if (!availability) {
      return res.status(404).send('No availability found for the specified time');
    }


    res.send('Session scheduled successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

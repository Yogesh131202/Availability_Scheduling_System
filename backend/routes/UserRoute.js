
const express = require('express');
const Availability = require('../models/Availability');
const User = require('../models/User');
const auth = require('../controller/UserAuth'); // Middleware to check JWT token

const router = express.Router();

// Add new availability
router.post('/availability', auth, async (req, res) => {
  const { day, startTime, endTime, duration } = req.body;
  try {
    const availability = new Availability({
      userId: req.user._id,
      day,
      startTime,
      endTime,
      duration,
    });
    await availability.save();
    res.status(201).json(availability);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update existing availability
router.put('/availability/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { day, startTime, endTime, duration } = req.body;

  try {
    const availability = await Availability.findOneAndUpdate(
      { _id: id, userId: req.user._id }, // Ensure the user can only update their own availability
      { day, startTime, endTime, duration },
      { new: true }
    );

    if (!availability) return res.status(404).send('Availability not found');
    res.json(availability);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete availability
router.delete('/availability/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const availability = await Availability.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!availability) return res.status(404).send('Availability not found');
    res.send('Availability deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

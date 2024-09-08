const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true },          // e.g., 'Monday', 'Tuesday'
  startTime: { type: String, required: true },    // e.g., '10:00 AM'
  endTime: { type: String, required: true },      // e.g., '3:00 PM'
  duration: { type: Number, default: 30 },        // e.g., 30 mins
});

module.exports = mongoose.model('Availability', availabilitySchema);

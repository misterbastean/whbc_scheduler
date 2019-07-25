const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  registrationCutoff: Date,
  startDate: Date,
  endDate: Date,
  workerRoles: [String],
  participantGroups: [String]
});

module.exports = mongoose.model('Event', eventSchema);

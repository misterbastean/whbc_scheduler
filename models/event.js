const mongoose  = require('mongoose')

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  registrationCutoff: Date,
  startDate: Date,
  endDate: Date,
  workerRoles: [String],
  participantGroups: [String],
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
});

module.exports = mongoose.model('Event', eventSchema);

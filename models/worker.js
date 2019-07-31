const mongoose          = require('mongoose')

const workerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  dob: Date,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  email: String,
  emergencyContacts:[
    {
      name: String,
      phone: String,
      relationship: String
    }
  ],
  shirtSize: String,
  comments: String,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model('Worker', workerSchema);

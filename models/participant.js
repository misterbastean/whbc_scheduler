const mongoose          = require('mongoose')

const participantSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  dob: Date,
  medical: String,
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
  authorizedPickups: [
    {
      name: String,
      phone: String
    }
  ],
  shirtSize: String,
  churchMember: Boolean,
  church: String,
  photoPermission: Boolean,
  photoPublication: Boolean,
  comments: String,
  user: String
});

module.exports = mongoose.model('Participant', participantSchema);

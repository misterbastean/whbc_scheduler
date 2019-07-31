const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  isAdmin: Boolean,
  isSuperuser: Boolean,
  workers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker"
    }
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant"
    }
  ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

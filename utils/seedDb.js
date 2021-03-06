const mongoose    = require('mongoose'),
      Event       = require('../models/event'),
      Worker      = require('../models/worker'),
      Participant = require('../models/participant'),
      User        = require('../models/user')

const dbEventSeeds = [
  {
    name: "VBS 2020",
    description: "A super cool time",
    imageUrl: "https://via.placeholder.com/150",
    registrationCutoff: new Date,
    startDate: new Date("July 9 2020"),
    endDate: new Date("July 15 2020"),
    workerRoles: ["Kitchen", "Registration", "Class Teacher", "Missions"],
    participantGroups: ["Blue", "Green", "Red", "Orange"],
    owner: {
      id: "5d39f81fd0b4cb775333fb94"
    }
  },
  {
    name: "Summer Camp",
    description: "Another awesome trip",
    imageUrl: "https://via.placeholder.com/150",
    registrationCutoff: new Date,
    startDate: new Date("August 5 2020"),
    endDate: new Date("August 9 2020"),
    workerRoles: ["Bus Driver", "Male Chaperone", "Female Chaperone", "Leader"],
    participantGroups: ["1st - 2nd", "3rd - 4th", "5th - 6th"],
    owner: {
      id: "5d39f81fd0b4cb775333fb94"
    }
  },
  {
    name: "Christmas Event",
    description: "Ho ho ho...",
    imageUrl: "https://via.placeholder.com/150",
    registrationCutoff: new Date,
    startDate: new Date("December 25 2020"),
    endDate: new Date("December 25 2020"),
    workerRoles: ["Role 1", "Role 2", "Role 3", "Role 4"],
    participantGroups: ["Giraffes", "Rhinos", "Lions", "Monkeys"],
    owner: {
      id: "5d39f8b4d0b4cb775333fb95"
    }
  }
]

const dbWorkerSeeds = [
  {
    firstName: "Johnny",
    lastName: "Bravo",
    gender: "Male",
    dob: new Date("January 1, 1980"),
    address: "123 Cartoon St.",
    city: "Cartoon Network",
    state: "NY",
    zip: "12345",
    phone: "1234567890",
    email: "johnny@bravo.com",
    emergencyContacts: [
      {
        name: "Heeeeey",
        phone: "3333333333",
        relationship: "Pretty Mama"
      },
      {
        name: "Alvin the Chipmunk",
        phone: "5675675678",
        relationship: "Pet"
      }
    ],
    shirtSize: "XXL",
    comments: "Here be my comments.",
    user: "jbastean"
  },
  {
    firstName: "Sabetha",
    lastName: "Belacoros",
    gender: "Female",
    dob: new Date("January 1, 1991"),
    address: "Shades Hill",
    city: "Camoor",
    state: "Therin",
    zip: "42424",
    phone: "3215436547",
    email: "sabetha@gb.com",
    emergencyContacts: [
      {
        name: "Locke Lamora",
        phone: "7777777777",
        relationship: "It's Complicated"
      },
      {
        name: "Jean Tannen",
        phone: "6546238376",
        relationship: "Friend"
      }
    ],
    shirtSize: "M",
    comments: "More comments here.",
    user: "jbastean"
  }
]

const dbParticipantSeeds = [
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    gender: "Male",
    dob: new Date("January 1, 1980"),
    medical: "Peanut allergy",
    address: "123 Cartoon St.",
    city: "Cartoon Network",
    state: "NY",
    zip: "12345",
    phone: "1234567890",
    email: "johnny@bravo.com",
    emergencyContacts: [
      {
        name: "Heeeeey",
        phone: "3333333333",
        relationship: "Pretty Mama"
      },
      {
        name: "Alvin the Chipmunk",
        phone: "5675675678",
        relationship: "Pet"
      }
    ],
    authorizedPickups: [
      {
        name: "Pickup One",
        phone: "1231231234"
      },
      {
        name: "Pickup Two",
        phone: "3453453455"
      },
      {
        name: "Pickup Three",
        phone: "7777777777"
      }
    ],
    shirtSize: "XXL",
    churchMember: true,
    church: "West Hartsville",
    photoPermission: true,
    photoPublication: true,
    comments: "Here be my comments.",
    user: "jbastean"
  },
  {
    firstName: "Mary",
    lastName: "Watson",
    gender: "Female",
    dob: new Date("January 1, 1991"),
    medical: "",
    address: "Shades Hill",
    city: "Camoor",
    state: "Therin",
    zip: "42424",
    phone: "3215436547",
    email: "sabetha@gb.com",
    emergencyContacts: [
      {
        name: "Locke Lamora",
        phone: "7777777777",
        relationship: "It's Complicated"
      },
      {
        name: "Jean Tannen",
        phone: "6546238376",
        relationship: "Friend"
      }
    ],
    authorizedPickups: [
      {
        name: "Pickup One",
        phone: "1231231234"
      },
      {
        name: "Pickup Two",
        phone: "3453453455"
      },
      {
        name: "Pickup Three",
        phone: "7777777777"
      }
    ],
    shirtSize: "M",
    churchMember: false,
    church: "",
    photoPermission: false,
    photoPublication: false,
    comments: "More comments here.",
    user: "jbastean"
  }
]


const seedDb = () => {
  // Delete all events, then create new
  Event.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed events");
    }
  });
  dbEventSeeds.forEach((item) => {
    Event.create(item, (err, addedEvent) => {
      if (err) {
        console.log(err);
      } else {
      }
    })
  });
  console.log("Created events");
  // Create workers
  // ENTERING CALLBACK HELL - BEWARE ALL YE WHO ENTER HERE
  Worker.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed worker documents");
      User.findOneAndUpdate({_id: "5d39f81fd0b4cb775333fb94"}, {workers: []}, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Removed workers from jbastean user");
          dbWorkerSeeds.forEach((item) => {
            Worker.create(item, (err, addedWorker) => {
              if (err) {
                console.log(err);
              } else {
                User.findOneAndUpdate({_id: "5d39f81fd0b4cb775333fb94"}, { $push: {workers: addedWorker}}, (err) => {
                  if (err) {
                    console.log(err);
                  }
                })
              }
            })
          })
          console.log("Added workers");
        }
      })
    }
  });

  // Create Participants
  // STILL IN CALLBACK HELL - YOU SHOULD HAVE TURNED BACK!
  Participant.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed participant documents");
      User.findOneAndUpdate({_id: "5d39f81fd0b4cb775333fb94"}, {participants: []}, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Removed participants from jbastean user");
          dbParticipantSeeds.forEach((item) => {
            Participant.create(item, (err, addedParticipant) => {
              if (err) {
                console.log(err);
              } else {
                User.findOneAndUpdate({_id: "5d39f81fd0b4cb775333fb94"}, { $push: {participants: addedParticipant}}, (err) => {
                  if (err) {
                    console.log(err);
                  }
                })
              }
            })
          })
        }
      })
    }
  })
}

module.exports = seedDb;

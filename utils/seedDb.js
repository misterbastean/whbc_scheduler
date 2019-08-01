const mongoose  = require('mongoose'),
      Event     = require('../models/event'),
      Worker    = require('../models/worker'),
      User      = require('../models/user')

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
    phone: "123-456-7890",
    email: "johnny@bravo.com",
    emergencyContacts: [
      {
        name: "Heeeeey",
        phone: "333-333-3333",
        relationship: "Pretty Mama"
      },
      {
        name: "Alvin the Chipmunk",
        phone: "567-567-5678",
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
    phone: "321-543-6547",
    email: "sabetha@gb.com",
    emergencyContacts: [
      {
        name: "Locke Lamora",
        phone: "777-777-7777",
        relationship: "It's Complicated"
      },
      {
        name: "Jean Tannen",
        phone: "654-623-8376",
        relationship: "Friend"
      }
    ],
    shirtSize: "M",
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
        console.log("Event added");
      }
    })
  });

  // Delete all workers
  Worker.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed worker documents");
    }
  });

  User.findOneAndUpdate({_id: "5d39f81fd0b4cb775333fb94"}, {workers: []}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed workers from jbastean user");
    }
  }).then(
    dbWorkerSeeds.forEach((item) => {
      Worker.create(item, (err, addedWorker) => {
        if (err) {
          console.log(err);
        } else {
          User.findOneAndUpdate({_id: "5d39f81fd0b4cb775333fb94"}, { $push: {workers: addedWorker}}, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Added worker");
            }
          })
        }
      })
    })
  )
}

module.exports = seedDb;

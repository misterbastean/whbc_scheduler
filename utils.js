const mongoose  = require('mongoose'),
      Event     = require('./models/event')

const dbSeeds = [
  {
    name: "VBS 2020",
    description: "A super cool time",
    imageUrl: "https://via.placeholder.com/150",
    registrationCutoff: new Date,
    dates: [new Date("July 9 2020"), new Date("July 10 2020"), new Date("July 11 2020")],
    workerRoles: ["Kitchen", "Registration", "Class Teacher", "Missions"],
    participantGroups: ["Blue", "Green", "Red", "Orange"]
  },
  {
    name: "Summer Camp",
    description: "Another awesome trip",
    imageUrl: "https://via.placeholder.com/150",
    registrationCutoff: new Date,
    dates: [new Date("July 20 2020"), new Date("July 21 2020"), new Date("July 22 2020")],
    workerRoles: ["Bus Driver", "Male Chapperone", "Female Chapperone", "Leader"],
    participantGroups: ["1st - 2nd", "3rd - 4th", "5th - 6th"]
  },
  {
    name: "Another Event",
    description: "Another amazing time",
    imageUrl: "https://via.placeholder.com/150",
    registrationCutoff: new Date,
    dates: [new Date("February 12 2020"), new Date("February 13 2020"), new Date("February 14 2020")],
    workerRoles: ["Role 1", "Role 2", "Role 3", "Role 4"],
    participantGroups: ["Giraffes", "Rhinos", "Lions", "Monkeys"]
  }
]

const utils = {
  seedDb: () => {
    Event.deleteMany({}, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Removed events");
      }
    });
    dbSeeds.forEach((item) => {
      Event.create(item, (err, addedEvent) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Event added");
        }
      })
    })
  }
}

module.exports = utils;

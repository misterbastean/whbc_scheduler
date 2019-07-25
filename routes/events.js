// workerRoles and participantGroups are adding an extra space every time event is updated

const express       = require('express'),
      router        = express.Router(),
      Event         = require('../models/event');

// =============================
// EVENTS
// =============================
router.get('/', (req, res) => {
  Event.find({})
  .exec((err, foundEvents) => {
    if (err) {
      console.log(err);
      res.send('Error fetching events.')
    } else {
      res.render('events/showEvents', {events: foundEvents})
    }
  })
});

router.get('/new', (req, res) => {
  res.render("events/newEvent")
});

router.post('/', (req, res) => {
  console.log(`Create new event called ${req.body.eventName}`);
  // Use correct imageUrl
  let imageUrl;
  if (!!req.body.imageUrl) {
    imageUrl = req.body.imageUrl;
  } else {
    imageUrl = 'https://via.placeholder.com/150';
  }

  // Create workerRoles array
  const workerRoles = req.body.workerRoles.split(",")
  let workerRolesTrimmed = []
  workerRoles.forEach((role) => workerRolesTrimmed.push(role.trim()))
  console.log(workerRolesTrimmed);

  // Create participantGroups array
  const participantGroups = req.body.participantGroups.split(",")
  let participantGroupsTrimmed = []
  participantGroups.forEach((role) => participantGroupsTrimmed.push(role.trim()))
  console.log(participantGroupsTrimmed);

  // Create event object
  const newEvent = {
    name: req.body.eventName,
    description: req.body.eventDescription,
    imageUrl,
    registrationCutoff: req.body.registrationCutoff,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    workerRolesTrimmed,
    participantGroupsTrimmed
  }

  Event.create(newEvent, (err, addedEvent) => {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      console.log("Event added");
      res.redirect(`/events/${addedEvent._id}`)
    }
  })
});

router.get('/:id', (req, res) => {
  Event.findById(req.params.id, (err, foundEvent) => {
    if (err) {
      console.log(err);
      res.send(`Error loading event with ID of ${req.params.id}.`);
    } else {
      res.render('events/showEvent', {foundEvent});
    }
  })
});

router.get('/:id/edit', (req, res) => {
  // Get event info from DB
  Event.findById(req.params.id, (err, foundEvent) => {
    if (err) {
      console.log(err);
      res.send(`Error finding event with ID of ${req.params.id}`)
    } else {
      const formattedEvent = {
        _id: foundEvent._id,
        name: foundEvent.name,
        description: foundEvent.description,
        imageUrl: foundEvent.imageUrl,
        registrationCutoff: foundEvent.registrationCutoff,
        startDate: foundEvent.startDate.toLocaleDateString("en-US"),
        endDate: foundEvent.endDate.toLocaleDateString("en-US"),
        workerRoles: foundEvent.workerRoles,
        participantGroups: foundEvent.participantGroups
      }
      res.render('events/editEvent', {foundEvent: formattedEvent})
    }
  })
});

router.put('/:id', (req, res) => {
  // Trim whitespace from workerRoles and participantGroups and push to array
  const workerRoles = req.body.workerRoles.split(",")
  let workerRolesTrimmed = []
  workerRoles.forEach((role) => workerRolesTrimmed.push(role.trim()))
  console.log(workerRolesTrimmed);

  const participantGroups = req.body.participantGroups.split(",")
  let participantGroupsTrimmed = []
  participantGroups.forEach((role) => participantGroupsTrimmed.push(role.trim()))
  console.log(participantGroupsTrimmed);

  updatedEvent = {
    name: req.body.eventName,
    description: req.body.eventDescription,
    imageUrl: req.body.imageUrl,
    registrationCutoff: req.body.registrationCutoff,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    workerRoles: workerRolesTrimmed,
    participantGroups: participantGroupsTrimmed
  }
  console.log(updatedEvent.workerRoles);

  Event.findByIdAndUpdate(req.params.id, updatedEvent, (err, oldEvent) => {
    if (err) {
      console.log(err);
      res.send(`There was a problem updating: ${err}`)
    } else {
      console.log(`Updated event with id of ${req.params.id}`);
      res.redirect(`/events/${req.params.id}`)
    }
  })
});

router.delete('/:id', (req, res) => {
  res.send(`Delete event with ID of ${req.params.id}, then redirect to /events`)
});

// =============================
// EVENT WORKERS
// =============================

router.get('/:id/workers/new', (req, res) => {
  res.send(`Show form to add worker(s) to event with ID of ${req.params.id}`)
});

router.post('/:id/workers', (req, res) => {
  res.send(`Add submitted worker(s) to event with ID of ${req.params.id}, the redirect to that events information page`)
});

router.get('/:id/workers/edit', (req, res) => {
  res.send(`Show form to edit workers for event with ID of ${req.params.id}`)
});

router.put('/:id/workers', (req, res) => {
  res.send(`Update workers for event with ID of ${req.params.id}`)
});

// =============================
// EVENT PARTICIPANTS
// =============================

router.get('/:id/participants/new', (req, res) => {
  res.send(`Show form to add participant(s) to event with ID of ${req.params.id}`)
});

router.post('/:id/participants', (req, res) => {
  res.send(`Edit participant(s) for event with ID of ${req.params.id}, the redirect to that events information page`)
});

router.get('/:id/participants/edit', (req, res) => {
  res.send(`Show form to edit participants for event with ID of ${req.params.id}`)
});

router.put('/:id/participants', (req, res) => {
  res.send(`Update participants for event with ID of ${req.params.id}`)
});



module.exports = router;

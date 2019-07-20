const express       = require('express'),
      router        = express.Router(),
      Event         = require('../models/event');

// =============================
// EVENTS
// =============================
router.get('/', (req, res) => {
  res.render("events/showEvents")
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
  let workerRoles = req.body.workerRoles.split(",")

  // Create participantGroups array
  let participantGroups = req.body.participantGroups.split(",")

  // Create event object
  const newEvent = {
    name: req.body.eventName,
    description: req.body.eventDescription,
    imageUrl,
    registrationCutoff: req.body.registrationCutoff,
    eventDates: req.body.eventDates,
    workerRoles,
    participantGroups
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
  res.send(`Show information about event with the ID of ${req.params.id}`)
});

router.get('/:id/edit', (req, res) => {
  res.send(`Show form to edit details of event with the ID of ${req.params.id}`)
});

router.put('/:id', (req, res) => {
  console.log(`Update event with id of ${req.body.eventId}`);
  res.send(`Update event with id of ${req.params.id}, then redirect to that event's information page`)
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

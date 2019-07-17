const express       = require('express'),
      router        = express.Router();

// =============================
// EVENTS
// =============================
router.get('/', (req, res) => {
  res.send("Show events index")
});

router.get('/new', (req, res) => {
  res.send("Show form to create new event")
});

router.post('/', (req, res) => {
  res.send("Create new event, then redirect to that event's information page")
});

router.get('/:id', (req, res) => {
  res.send(`Show information about event with the ID of ${req.params.id}`)
});

router.get('/:id/edit', (req, res) => {
  res.send(`Show form to edit details of event with the ID of ${req.params.id}`)
});

router.put('/:id', (req, res) => {
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

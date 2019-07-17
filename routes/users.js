const express = require('express'),
      router  = express.Router();

router.get('/', (req, res) => {
  res.send('Show index of users')
});

router.get('/new', (req, res) => {
  res.send('Show form to register as a new user')
});

router.post('/', (req, res) => {
  res.send('Create new user, login as that user, then redirect to /events')
});

router.get('/:id', (req, res) => {
  res.send(`Show information page for user ID ${req.params.id}`)
});

router.get('/:id/edit', (req, res) => {
  res.send(`Show form to edit information for user ID ${req.params.id}`)
});

router.put('/:id', (req, res) => {
  res.send(`Update information for user ID ${req.params.id}, then redirect to /users/:id`)
});

router.delete('/:id', (req, res) => {
  res.send(`Delete user with ID of ${req.params.id}`)
});


module.exports = router;

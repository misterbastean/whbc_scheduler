const express     = require('express'),
      router      = express.Router(),
      User        = require('../models/user'),
      middleware  = require('../utils/middleware')


// =====================
// USERS
// =====================
router.get('/', middleware.isAdmin, (req, res) => {
  res.send('Show index of users')
});

router.get('/new', (req, res) => {
  res.render('users/newUser')
});

router.post('/', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    isAdmin: false
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('back')
    }
    res.redirect('/events')
  })
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


// =====================
// WORKERS
// =====================
router.get('/:id/workers', (req, res) => {
  res.send(`Show index of all workers associated with user ID ${req.params.id}`)
});

router.get('/:id/workers/new', (req, res) => {
  res.send(`Show form to create new worker associated with user ID ${req.params.id}`)
});

router.post('/:id/workers', (req, res) => {
  res.send(`Create new worker associated with user ID ${req.params.id}`)
});

router.get('/:id/workers/:wid', (req, res) => {
  res.send(`Get information about worker ID ${req.params.wid}, who is associated with user ID ${req.params.id}`)
});

router.get('/:id/workers/:wid/edit', (req, res) => {
  res.send(`Show edit form for worker ID ${req.params.wid}, who is associated with user ID ${req.params.id}`)
});

router.put('/:id/workers/:wid', (req, res) => {
  res.send(`Update information for worker ID ${req.params.wid}, who is associated with user ID ${req.params.id}`)
});

router.delete('/:id/workers/:wid', (req, res) => {
  res.send(`Delete worker ID ${req.params.wid}, who is associated with user ID ${req.params.id}`)
});


// =====================
// PARTICIPANTS
// =====================
router.get('/:id/participants', (req, res) => {
  res.send(`Show index of all participants associated with user ID ${req.params.id}`)
});

router.get('/:id/participants/new', (req, res) => {
  res.send(`Show form to create new participant associated with user ID ${req.params.id}`)
});

router.post('/:id/participants', (req, res) => {
  res.send(`Create new participant associated with user ID ${req.params.id}`)
});

router.get('/:id/participants/:pid', (req, res) => {
  res.send(`Get information about participant ID ${req.params.pid}, who is associated with user ID ${req.params.id}`)
});

router.get('/:id/participants/:pid/edit', (req, res) => {
  res.send(`Show edit form for participant ID ${req.params.pid}, who is associated with user ID ${req.params.id}`)
});

router.put('/:id/participants/:pid', (req, res) => {
  res.send(`Update information for participant ID ${req.params.pid}, who is associated with user ID ${req.params.id}`)
});

router.delete('/:id/participants/:pid', (req, res) => {
  res.send(`Delete participant ID ${req.params.pid}, who is associated with user ID ${req.params.id}`)
});


module.exports = router;

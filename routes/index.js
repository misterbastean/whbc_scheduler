const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport')


router.get('/', (req, res) => {
  res.render('landing')
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.post('/login', passport.authenticate('local',
  {
      successRedirect: '/events',
      failureRedirect: '/login'
  }
));

router.post('/logout', (req, res) => {
  res.send('Log user out, then redirect to /')
});

module.exports = router;

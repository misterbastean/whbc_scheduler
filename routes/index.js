const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport'),
      middleware = require('../utils/middleware')


router.get('/', (req, res) => {
  res.render('landing')
});

router.get('/login', middleware.canLogIn, (req, res) => {
  res.render('login')
});

router.post('/login', passport.authenticate('local',
  {
      successRedirect: '/events',
      failureRedirect: '/login'
  }
));

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
});

module.exports = router;

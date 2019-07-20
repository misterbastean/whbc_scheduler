const express   = require('express'),
      router    = express.Router();


router.get('/', (req, res) => {
  res.render('landing')
});

router.get('/login', (req, res) => {
  res.render('login')
});

router.post('/login', (req, res) => {
  res.send('Log user in, then redirect to /events')
});

router.post('/logout', (req, res) => {
  res.send('Log user out, then redirect to /')
});

module.exports = router;

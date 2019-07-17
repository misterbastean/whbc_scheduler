const express   = require('express'),
      router    = express.Router();


router.get('/', (req, res) => {
  res.send('Landing page')
});

router.get('/login', (req, res) => {
  res.send('Show login form')
});

router.post('/login', (req, res) => {
  res.send('Log user in, then redirect to /')
});

router.post('/logout', (req, res) => {
  res.send('Log user out, then redirect to /')
});

module.exports = router;

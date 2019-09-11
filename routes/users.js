const express     = require('express'),
      router      = express.Router(),
      User        = require('../models/user'),
      Worker      = require('../models/worker'),
      Participant = require('../models/participant'),
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
  if (req.body.password != req.body.passwordVerify) {
    console.log("Passwords don't match");
    res.redirect("back");
  } else {
    const newUser = new User({
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      isAdmin: false,
      isSuperuser: false
    });

    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('back')
      } else {
        res.redirect('/events')
      }
    })
  }
});

router.get('/:id', middleware.checkUserOwnership, (req, res) => {
  var userParams = {
    workers: [],
    participants: []
  }

  Worker.find({user: req.user.username}, (err, foundWorkers) => {
    if (err) {
      console.log(err);
      res.redirect("back")
    } else {
      foundWorkers.forEach((worker) => {
        userParams.workers.push(worker)
      })
      Participant.find({user: req.user.username}, (err, foundParticipants) => {
        if (err) {
          console.log(err);
          res.redirect("back")
        } else {
          foundParticipants.forEach((participant) => {
            userParams.participants.push(participant)
          })
        }
        res.render("users/userProfile", {userParams})
      })
    }
  })
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
router.get('/:id/workers', (req, res) => { // REMOVE THIS ROUTE?
  res.send(`Show index of all workers associated with user ID ${req.params.id}`)
});

router.get('/:id/workers/new', (req, res) => {
  res.render("workers/newWorker")
});

router.post('/:id/workers', (req, res) => { // Need to add middleware to authorize
  // Lookup User using ID
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.redirect('back')
    } else {
      // Create new worker object
      const newWorker = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email,
        emergencyContacts: req.body.emergencyContacts,
        shirtSize: req.body.shirtSize,
        comments: req.body.comments,
        user: req.user.username
      }
      // Add new worker to database
      Worker.create(newWorker, (err, addedWorker) => {
        if (err) {
          console.log(err);
          res.redirect('back');
        } else {
          // add worker to User
          foundUser.workers.push(addedWorker);
          foundUser.save()
          console.log('Added new worker to User!');
          console.log(newWorker);

          // Redirect back to user profile page
          res.redirect(`/users/${req.user._id}`)
        }
      })
    }
  })
});

router.get('/:id/workers/:wid', (req, res) => {
  Worker.findById(req.params.wid, (err, foundWorker) => {
    if (err) {
      console.log(err);
      res.redirect("back")
    } else {
      res.render("workers/editWorker", {foundWorker})
    }
  })
});

router.put('/:id/workers/:wid', (req, res) => {
  // Create update object
  let updatedWorker = (({firstName, lastName, gender, dob, address, city, state, zip, email, shirtSize, comments}) => ({firstName, lastName, gender, dob, address, city, state, zip, email, shirtSize, comments}))(req.body)
  // Format Phone
  let formattedPhone = req.body.phone.replace(/-/g, "").replace(/\s/g, "")
  updatedWorker.phone = formattedPhone

  // Format emergency contacts
  let formattedContactOne = {
    name: req.body.emergencyContacts[0].name,
    phone: req.body.emergencyContacts[0].phone.replace(/-/g, "").replace(/\s/g, ""),
    relationship: req.body.emergencyContacts[0].relationship
  }

  let formattedContactTwo = {
    name: req.body.emergencyContacts[1].name,
    phone: req.body.emergencyContacts[1].phone.replace(/-/g, "").replace(/\s/g, ""),
    relationship: req.body.emergencyContacts[1].relationship
  }
  updatedWorker.emergencyContacts = [formattedContactOne, formattedContactTwo]

  Worker.findByIdAndUpdate(req.params.wid, updatedWorker, (err) => {
    if (err) {
      console.log(err);
      res.redirect('back')
    } else {
      res.redirect(`/users/${req.user._id}`)
    }
  })
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
  res.render('participants/newParticipant');
});

router.post('/:id/participants', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.redirect('back')
    } else {
      // Create new participant object
      let newParticipant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dob: req.body.dob,
        medical: req.body.medical,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone.replace(/-/g, "").replace(/\s/g, ""),
        email: req.body.email,
        emergencyContacts: [],
        authorizedPickups: [],
        shirtSize: req.body.shirtSize,
        churchMember: req.body.churchMember,
        church: req.body.church,
        photoPermission: req.body.photoPermission,
        photoPublication: req.body.photoPublication,
        comments: req.body.comments,
        user: req.user.username
      }

      // Format emergency contacts
      req.body.emergencyContacts.forEach((contact) => {
        newParticipant.emergencyContacts.push({
          name: contact.name,
          phone: contact.phone.replace(/-/g, "").replace(/\s/g, ""),
          relationship: contact.relationship
        })
      })

      // Format authorized pickups
      req.body.authorizedPickups.forEach((pickup) => {
        newParticipant.authorizedPickups.push({
          name: pickup.name,
          phone: pickup.phone.replace(/-/g, "").replace(/\s/g, "")
        })
      })

      // Add Participant to Databaser
      Participant.create(newParticipant, (err, createdParticipant) => {
        if (err) {
          console.log(err);
          res.redirect("back")
        } else {
          // Push Participant to User.participants
          foundUser.participants.push(createdParticipant);
          foundUser.save();
          console.log(`Added new participant to ${foundUser.username}!`);
          console.log(createdParticipant);
          res.redirect(`/users/${req.user._id}`)
        }
      })
    }
  })
});

router.get('/:id/participants/:pid', (req, res) => {
  Participant.findById(req.params.pid, (err, foundParticipant) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      console.log(foundParticipant);
      res.render("participants/editParticipant", {foundParticipant})
    }
  })
});

router.put('/:id/participants/:pid', (req, res) => {
  res.send(`Update information for participant ID ${req.params.pid}, who is associated with user ID ${req.params.id}`)
});

router.delete('/:id/participants/:pid', (req, res) => {
  res.send(`Delete participant ID ${req.params.pid}, who is associated with user ID ${req.params.id}`)
});


module.exports = router;

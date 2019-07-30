let middlewareObj = {};
const Event       = require('../models/event')

// Check if user is logged in; redirect if not
middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("You need to login to do that"); // Replace with Flash
    res.redirect('/login')
  }
};

// Check if user is logged in; redirect if yes (opposite of above)
middlewareObj.canLogIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    console.log("User already logged in"); // Replace with Flash
    res.redirect('/events')
  }
}

// Check if user is an admin
middlewareObj.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    } else {
      console.log("Only admins can do that"); // Replace with Flash
      res.redirect("/events")
    }
  } else {
    console.log("You must login to do that"); // Replace with Flash
    res.redirect("/login")
  }
}

// Check if user owns an event
middlewareObj.checkEventOwnership = (req, res, next) => {
  // Check if user is logged in
  if (req.isAuthenticated()) {
    // Find the event from the DB
    Event.findById(req.params.id, (err, foundEvent) => {
      if (err || !foundEvent) {
        console.log("Comment not found");
        res.redirect(back)
      } else {
        // Does the user own the event?
        if (foundEvent.owner.id.equals(req.user._id)) {
          next();
        } else {
          console.log("You don't have permission to do that");
          res.redirect('back')
        }
      }
    })
  } else {
    console.log("You need to be logged in to do that");
    res.redirect("back");
  }

}

// Check if user owns a user profile

// Check if user owns a worker

// Check if user owns a participant

module.exports = middlewareObj;

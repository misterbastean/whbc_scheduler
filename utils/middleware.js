let middlewareObj = {};

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

module.exports = middlewareObj;

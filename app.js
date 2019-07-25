// Currently Working On:
// Authentication (just added login, need to work on logout as well as isLoggedIn and isAdmin middleware)

const express               = require('express'),
      app                   = express(),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      methodOverride        = require('method-override'),
      passport              = require('passport'),
      path                  = require('path'),
      seedDb                 = require('./utils/seedDb'),
      User                  = require('./models/user'),
      LocalStrategy         = require('passport-local');

      // Only import config if working locally
      let config;
      try {
        config              = require('./config.js')
      } catch (e) {
        console.log("Config was not imported. This probably means you are not working locally.");
        console.log(e);
      }

// Route Imports
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');

// MethodOverride Config
app.use(methodOverride('_method'));

// //Mongoose setup and config
mongoose.Promise = global.Promise;
const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false
}

// MONGOOSE MONGODB ATLAS CONNECTION
const connectString = `mongodb+srv://${config.database.username}:${config.database.password}@whbc-scheduler-dlmgb.mongodb.net/test?retryWrites=true&w=majority`
try {
  mongoose.connect(connectString, mongooseOptions);
} catch(e) {
  console.log("DB Connection fallback");
  mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@whbc-scheduler-dlmgb.mongodb.net/test?retryWrites=true&w=majority`, mongooseOptions);
}

// MONGOOSE LOCALHOST CONNECTION
// mongoose.connect("mongodb://localhost/scheduler_db", mongooseOptions, () => console.log("LOCALHOST DB IN USE!!!"));


// bodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up view engine
app.set('view engine', 'ejs');

// Authentication
try {
  app.use(require('express-session')({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
  }));
} catch(e) {
  app.use(require('express-session')({
    secret: process.env.ES_SECRET,
    resave: false,
    saveUninitialized: false
  }));
}

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass currentUser to each page
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next()
});

// Serve public folder and views folder
app.use('/public', express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/', indexRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

// Seed DB
seedDb();

// Listening
app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log(`Scheduler server is running on port ${process.env.PORT || 3000}!`);
});

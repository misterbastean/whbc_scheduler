const express               = require('express'),
      app                   = express(),
      mongoose              = require('mongoose'),
      bodyParser            = require('body-parser'),
      methodOverride        = require('method-override'),
      path                  = require('path')

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
const eventRoutes = require('./routes/events');

// MethodOverride Config
app.use(methodOverride('_method'));

//Mongoose setup and config
mongoose.Promise = global.Promise;
const mongooseOptions = {
  useNewUrlParser: true
}
const connectString = `mongodb+srv://${config.database.username}:${config.database.password}@whbc-scheduler-dlmgb.mongodb.net/test?retryWrites=true&w=majority`
try {
  mongoose.connect(connectString, mongooseOptions);
} catch(e) {
  console.log("DB Connection fallback");
  mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@whbc-scheduler-dlmgb.mongodb.net/test?retryWrites=true&w=majority`, mongooseOptions);
}


// bodyParser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set up view engine
app.set('view engine', 'ejs');

// Serve public folder and views folder
app.use('/public', express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/', indexRoutes);
app.use('/events', eventRoutes);

// Listening
app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log(`Scheduler server is running on port ${process.env.PORT || 3000}!`);
});

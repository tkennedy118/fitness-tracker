// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

// App usage
const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Get database models and connect to database
const db = require('./models');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Routes
require('./controller/routes.js')(app);

// Start express application
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

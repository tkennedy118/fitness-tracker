let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

db.Workout.deleteMany({})
  .then(data => {
    console.log(`Deleted ${data.deletedCount} documents `);
    process.exit(0);
  })
  .catch(error => {
    console.log('Error: ', error);
    process.exit(1);
  });
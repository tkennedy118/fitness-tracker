const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = newSchema({
  day: Date,
  exercise: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;
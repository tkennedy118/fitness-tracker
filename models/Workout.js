const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ExerciseSchema = require('./Exercise');

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [ExerciseSchema],
}, { toJSON: { virtuals: true } 
});

WorkoutSchema.virtual('totalDuration').get(function() {
  let totalDuration = 0;
  this.exercises.forEach(exercise => {
    totalDuration += exercise.duration;
  });

  return totalDuration;
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;
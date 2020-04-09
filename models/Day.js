const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
  day: {
    type: Date,
    unique: true
  },
  exercises: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise'
  }
});

const Day = mongoose.model('Day', WorkoutSchema);
module.exports = Day;
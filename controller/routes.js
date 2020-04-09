const mongoose = require('mongoose');
const db = require('../models');

module.exports = function(app) {

  // GET  /api/workouts
  app.get('/api/workouts', (req, res) => {
    db.Workout.find({}).limit(1).sort({ day: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // PUT  /api/workouts
  app.put('/api/workouts', ({ body }, res) => {
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // POST /api/workouts
  app.post('/api/workouts', ({ body }, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // GET  /api/workouts/range
  app.get('api/workouts/range', (req, res) => {

  });
};
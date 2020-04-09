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
  app.put('/api/workouts/:id', ({ body }, res) => {
    const id = req.params.id;
    
    db.Exercise.create(body)
      .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: _id } }, { new: true }))
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // POST /api/workouts
  app.post('/api/workouts/', ({ body }, res) => {
    const day = new Date.now().getDay();
    console.log('DAY: ', day);
    console.log('BODY: ', body);
    const workout = {
      day: day,
      exercised: body
    };
    db.Workout.create(workout)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // GET  /api/workouts/range. Gets all workouts
  app.get('api/workouts/range', (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });
};
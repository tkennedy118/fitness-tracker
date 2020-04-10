const mongoose = require('mongoose');
const db = require('../models');

module.exports = function(app) {

  // GET /exercise
  app.get('/exercise', (req, res) => {
    res.redirect('/exercise.html');
  });

  // GET /stats
  app.get('/stats', (req, res) => {
    res.redirect('/stats.html');
  });

  // GET  /api/workouts
  app.get('/api/workouts', (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(1)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // PUT  /api/workouts
  app.put('/api/workouts/:id', ({ body, params }, res) => {
    console.log('INSIDE PUT /API/WORKOUTS/:ID');
    console.log(':ID ', params.id);
    console.log('BODY ', body);
    const id = params.id;

    db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: body }}, { new: true, runValidators: true })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // POST /api/workouts
  app.post('/api/workouts', ({ body }, res) => {
    console.log('INSIDE POST /API/WORKOUTS');
    console.log('BODY ', body);

    db.Workout.create({ day: Date.now() })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });

  // GET  /api/workouts/range. Gets all workouts
  app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(error => {
        res.json(error);
      });
  });
};
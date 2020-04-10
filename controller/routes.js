const mongoose = require('mongoose');
const db = require('../models');

module.exports = function(app) {

  // GET /exercise.
  app.get('/exercise', (req, res) => {
    const id = req.url.split('=')[1];

    if (id === undefined) {
      res.redirect('/exercise.html');
    } else {
      res.redirect('/exercise.html?=' + id);
    }
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
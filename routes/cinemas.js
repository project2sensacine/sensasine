  const express = require('express');
  const router = express.Router();
  const Place = require('../models/places.model')

  router.get('/new', (req, res) => res.render('auth/profile'))

  router.post('/', (req, res, next) => {


    const location = {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    }
    const newPlace = new Place({
      name: req.body.name,
      type: req.body.type,
      location
    })

    newPlace.save((error) => {
      if (error) {
        next(error);
      } else {
        res.redirect('auth/profile');
      }
    });
  });
  // el api
  router.get('/api', (req, res, next) => {
    Place.find()
      .then(allPlacesFromDB => res.json(allPlacesFromDB))
      .catch(err => next(err))
  })

  router.get('/api/:id', (req, res, next) => {
    Place.findById(req.params.id)
      .then(thePlace => res.json(thePlace))
      .catch(err => next(err))
  })
  module.exports = router;
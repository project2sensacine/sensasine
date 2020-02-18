const express = require('express');
const router = express.Router();

const axios = require('axios')
const axiosApp = axios.create({ baseURL: `https://api.themoviedb.org/3` })

// // https://api.themoviedb.org/3/search/movie?api_key=###&query=the+avengers


router.get('/:id/details', (req, res, next) => {

  const promiseFilm = axiosApp.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.movieAPI}&language=en-US`)
  const promiseCrew = axiosApp.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.movieAPI}`)

  Promise.all([promiseFilm, promiseCrew])
    .then(promiseResult => {
      res.render('movies/profile', {
        movie: promiseResult[0].data,
        crew: promiseResult[1].data.cast
      })
    })
    .catch(err => console.log(err))

})


router.get('/search', (req, res, next) => {

  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.movieAPI}&query=${req.query.query}`)
    .then(result => {
      res.render('movies/search-result', { search: req.query.query, results: result.data.results })
    })
    .catch(err => console.log(err))

})

router.get('/actor/:id/profile', (req, res, next) => {

  axios.get(`https://api.themoviedb.org/3/person/${req.params.id}?api_key=${process.env.movieAPI}&language=en-US`)
    .then(result => {
      res.render('movies/actor-profile', result.data)
    })
})





module.exports = router;
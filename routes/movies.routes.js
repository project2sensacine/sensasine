const express = require('express');
const router = express.Router();

const axios = require('axios')
const axiosApp = axios.create({ baseURL: `https://api.themoviedb.org/3` })

// // https://api.themoviedb.org/3/search/movie?api_key=###&query=the+avengers


router.get('/:id/details', (req, res, next) => {

  const promiseFilm = axiosApp.get(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=3d2f74f58c6181b5648f9595b8c34329&language=en-US`)
  const promiseCrew = axiosApp.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=3d2f74f58c6181b5648f9595b8c34329`)

  Promise.all([promiseFilm, promiseCrew])
    .then(promiseResult => {
      console.log(promiseResult[0].data)
      res.render('movies/profile', {
        movie: promiseResult[0].data,
        crew: promiseResult[1].data.cast
      })
    })
    .catch(err => console.log(err))

})


router.get('/search', (req, res, next) => {
  console.log(req.query.query)
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3d2f74f58c6181b5648f9595b8c34329&query=${req.query.query}`)
    .then(result => {
      console.log(req.query.query)
      res.render('movies/profile', result)
    })
    .catch(err => console.log(err))

})



module.exports = router;
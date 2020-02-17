const express = require('express');
const router = express.Router();

const axios = require('axios')
const axiosApp = axios.create({ baseURL: `https://api.themoviedb.org/3` })

/* GET home page */

router.get('/', (req, res, next) => {

  axiosApp.get('/movie/popular?api_key=3d2f74f58c6181b5648f9595b8c34329&language=en-US&page=1')
    .then(popularMovies => res.render('index', { movies: popularMovies.data.results }))
    .catch(err => console.log(err))

});

module.exports = router;

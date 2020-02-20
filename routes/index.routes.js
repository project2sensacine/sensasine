const express = require("express");
const router = express.Router();

const axios = require("axios");
const axiosApp = axios.create({ baseURL: `https://api.themoviedb.org/3` });

/* GET home page */

router.get("/", (req, res, next) => {
  const popularMovies = axiosApp.get(
    `/movie/popular?api_key=${process.env.movieAPI}&language=en-US&page=1`
  );
  const upcomingMovies = axiosApp.get(
    `/movie/upcoming?api_key=${process.env.movieAPI}&language=en-US&page=1`
  );
  const bestMovies = axiosApp.get(
    `/movie/top_rated?api_key=${process.env.movieAPI}&language=en-US&page=1`
  );

  Promise.all([popularMovies, upcomingMovies, bestMovies])
    .then(promiseResult => {
      res.render("index", {
        popular: promiseResult[0].data.results,
        upcoming: promiseResult[1].data.results,
        top_rated: promiseResult[2].data.results
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;

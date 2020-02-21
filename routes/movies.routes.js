const express = require("express");
const router = express.Router();
const Genre = require("../models/genres.model");
const Movie = require("../models/movies.model");
const User = require("../models/user.model");

const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const axios = require("axios");
const axiosApp = axios.create({ baseURL: `https://api.themoviedb.org/3` });
const pageNumber = 1;
// // https://api.themoviedb.org/3/search/movie?api_key=###&query=the+avengers

router.get("/:id/details", (req, res, next) => {
  const promiseFilm = axios.get(
    `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.movieAPI}&language=en-US`
  );
  const promiseCrew = axios.get(
    `https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.movieAPI}`
  );
  const promiseVideo = axios.get(
    `https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=${process.env.movieAPI}&language=en-US`
  );

  Promise.all([promiseFilm, promiseCrew, promiseVideo])
    .then(promiseResult => {
      res.render("movies/profile", {
        movie: promiseResult[0].data,
        crew: promiseResult[1].data.cast,
        video: promiseResult[2].data.results[0]
      });
    })
    .catch(err => console.log(err));
});


router.get("/search", (req, res, next) => {
  req.query.page++;
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.movieAPI}&query=${req.query.query}&page=${req.query.page}`
    )
    .then(result => {
      res.render("movies/search-result", {
        search: req.query.query,
        results: result.data.results,
        page: req.query.page
      });
    })
    .catch(err => console.log(err));
});

router.get("/actor/:id/profile", (req, res, next) => {
  const actorDetails = axios.get(
    `https://api.themoviedb.org/3/person/${req.params.id}?api_key=${process.env.movieAPI}&language=en-US`
  );
  const actorMovies = axios.get(
    `https://api.themoviedb.org/3/person/${req.params.id}/movie_credits?api_key=${process.env.movieAPI}&language=en-US`
  );
  Promise.all([actorDetails, actorMovies]).then(promiseResult => {
    res.render("movies/actor-profile", {
      details: promiseResult[0].data,
      movies: promiseResult[1].data.cast
    });
  });
});

router.get("/search/:genre", (req, res, next) => {

  //req.query.page++;
  Genre.find({ name: req.params.genre })
    .then(result => {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.movieAPI}&with_genres=${result[0].id}&page=1`
        )
        .then(results => {
          res.render("movies/search-result", {
            search: req.params.genre,
            results: results.data.results
            //page: req.query.page
          });
        })
        .catch(err => console.log(err));
      //res.render('movies/search-result', { peliculas: results })
    })
    .catch(err => console.log(err));
});


//GUARDAR PELIS EN FAVORITOS
router.get(
  "/:APIid/favourites",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {

    User.findByIdAndUpdate(req.user._id, { $push: { favoriteMovie: req.params.APIid } }, { new: true })
      .then(x => console.log(x))
      .catch(err => console.log(err));
  }
);

router.get("/:APIid/whishlist", ensureLoggedIn("/login"), (req, res, next) => {

  User.findByIdAndUpdate(req.user._id, { $push: { wishMovie: req.params.APIid } }, { new: true })
    .then(x => console.log(x))
    .catch(err => console.log(err))
});



router.get("/:id/videos", (req, res, next) => {
  axios.get(
    `https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=${process.env.movieAPI}&language=en-US`
  );
});

module.exports = router;


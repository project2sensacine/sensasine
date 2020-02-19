const express = require("express");
const router = express.Router();
const Genre = require("../models/genres.model");
const Movie = require("../models/movies.model");
const User = require("../models/user.model");

const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const axios = require("axios");
const axiosApp = axios.create({
  baseURL: `https://api.themoviedb.org/3`
});

// // https://api.themoviedb.org/3/search/movie?api_key=###&query=the+avengers

router.get("/:id/details", (req, res, next) => {
  const promiseFilm = axios.get(
    `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.movieAPI}&language=en-US`
  );
  const promiseCrew = axios.get(
    `https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.movieAPI}`
  );

  Promise.all([promiseFilm, promiseCrew])
    .then(promiseResult => {
      res.render("movies/profile", {
        movie: promiseResult[0].data,
        crew: promiseResult[1].data.cast
      });
    })
    .catch(err => console.log(err));
});

router.get("/ggg", (reqa, res, next) => {
  axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.movieAPI}&language=en-US`
    )
    .then(results => Genre.create(results.data.genres))
    .then(genres => console.log(" se ha cargado la info en la bbdd", genres))
    .catch(err => console.log(err));
});

router.get("/search", (req, res, next) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.movieAPI}&query=${req.query.query}`
    )
    .then(result => {
      res.render("movies/search-result", {
        search: req.query.query,
        results: result.data.results
      });
    })
    .catch(err => console.log(err));
});

router.get("/actor/:id/profile", (req, res, next) => {
  const actorDetails = axios.get(
    `https://api.themoviedb.org/3/person/${req.params.id}?api_key=${process.env.movieAPI}&language=en-US`
  );
  //const actorMovies = axios.get(`https://api.themoviedb.org/3/person/${req.params.id}/movie_credits?api_key=${process.env.movieAPI}&language=en-US`)
  Promise.all([actorDetails, actorMovies])
    .then(promiseResult => {
      console.log(promiseResult[0].data),
        res.render("movies/actor-profile", {
          details: promiseResult[0].data,
          movies: promiseResult[1].data.cast
        });
    })
    .catch(err => console.log(err));
});

router.get("/search/:genre", (req, res, next) => {
  Genre.find({
    name: req.params.genre
  })
    .then(result => {
      console.log(result);
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.movieAPI}&with_genres=${result.id}`
        )
        .then(results => {
          res.render("movies/search-result", {
            peliculas: results
          });
        });
    })
    .catch(err => console.log(err));
  axios.get(
    `https://api.themoviedb.org/3/person/${req.params.id}?api_key=${process.env.movieAPI}&language=en-US`
  );
  // https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.movieAPI}&language=en-US URL con todos los generos y los codigos
  // https://api.themoviedb.org/3/discover/movie?api_key=${process.env.movieAPI}&with_genres=28    peliculas por
});

router.get(
  "/:APIid/:poster_path/:title/favourites",
  ensureLoggedIn("/login"),
  (req, res, next) => {
    Movie.find({ APIid: req.params.APIid }).then(movie => {
      if (movie !== null) {
        const favoritemovies = req.user.favoriteMovies;
        favoritemovies.push(movie._id);

        // req.user.favoriteMovies.push()

        User.findByIdAndUpdate(req.user._id, {
          favoritemovies: favoritemovies
        });
      } else {
        const newMovie = new Movie({
          APIid: req.params.APIid,
          poster_path: req.params.poster_path,
          title: req.params.title
        });
        Movie.create(newMovie)
          .then(() => console.log("La pelicula se ha creado correctamente"))
          .catch(err => console.log(err));
      }

      const favoritemovies = req.user.favoriteMovies;
      favoritemovies.push();
      User.findById(req.user.id);
      //       .then(user =>
      // console.log("hola")
    });
    newMovie;
    Movie.create();
  }
);

module.exports = router;

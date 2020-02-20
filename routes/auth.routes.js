const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.model");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const axios = require("axios");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login", {
    message: req.flash("error")
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
  // (window.getElementsByClassName(Hide).style.display = "none"),
  // (window.getElementsByClassName(Hide1).style.display = "block")
);

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  console.log("HOLA HOLA");
  const username = req.body.username;
  const password = req.body.password;
  const location = req.body.location;
  if (username === "" || password === "" || location === "") {
    res.render("auth/signup", {
      message: "Indicate username and password"
    });
  }

  User.findOne(
    {
      username
    },
    "username",
    (err, user) => {
      if (user !== null) {
        res.render("auth/signup", {
          message: "The username already exists"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass,
        location
      });

      User.create(newUser)
        .then(user => {
          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            return res.redirect("/auth/profile");
          });
        })
        // .then(
        //   () => (document.getElementsByClassName(Hide).style.display = "none")
        // )
        // .then(
        //   () => (document.getElementsByClassName(Hide1).style.display = "block")
        // )
        .catch(() =>
          res.render("auth/signup", { message: "Something went wrong" })
        );
    }
  );
});


router.get("/profile", ensureLoggedIn("/auth/login"), (req, res) => {

  let promises = []
  console.log("YAYAYAYAYAYAY")
  req.user.favoriteMovie.forEach(elm => {
    const promesa = axios.get(`https://api.themoviedb.org/3/movie/${elm}?api_key=${process.env.movieAPI}&language=en-US`)
    // .then(movie => {
    //   favMovies.push(movie.data)
    // })
    // .then(console.log(favMovies, "--------------------------"))
    // .catch(err => console.log(err))
    promises.push(promesa)
  })


  Promise.all(promises)
    .then(movies => {
      console.log("promise all", movies)
      const data = { user: req.user, favMovies: movies }
      console.log(data)
      res.render("auth/profile", data)
    })
    .catch(err => res.render("error"))


});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

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

  let promisesFav = []
  let promiseWish = []

  req.user.favoriteMovie.forEach(elm => {
    const promesaFav = axios.get(`https://api.themoviedb.org/3/movie/${elm}?api_key=${process.env.movieAPI}&language=en-US`)
    promisesFav.push(promesaFav)
  })

  req.user.wishMovie.forEach(elm => {
    const promesaWish = axios.get(`https://api.themoviedb.org/3/movie/${elm}?api_key=${process.env.movieAPI}&language=en-US`)
    promiseWish.push(promesaWish)
  })

  // let promesa1
  // let promesa2
  Promise.all(promisesFav)
    .then(result => {
      arrObjPromesa1 = result

      Promise.all(promiseWish)
        .then(result => {
          arrObjPromesa2 = result

            // Promise.all([promesa1, promesa2])
            //   .then(result => {
            //     promesa1 = result[0]
            //     promesa2 = result[1]
            //     console.log("esto que es", promesa1)
            //     //console.log("------------------------PROMESA 1_---------------", promesa1[0])
            //   })


            //console.log("Segundo promise all --------------------------------------------------------------------------------------")


            //console.log("------------------------PROMESA 2_---------------", promesa2[0])
            .then(() => res.render('auth/profile', { user: req.user, favMovies: promesa1, wishMovies: promesa2 }))
        })
    })
    .catch(err => console.log(err))


  // Promise.all(promesa1, promesa2)
  //   .then(movies => {
  //     console.log("promise all", movies)
  //     const data = { user: req.user, favMovies: movies[0], wishMovies: movies[1] }
  //     console.log(data)
  //     res.render("auth/profile", data)
  //   })
  //   .catch(err => res.render("error"))


});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

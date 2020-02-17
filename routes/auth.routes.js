const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/user.model");
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login", {
    "message": req.flash("error")
  });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: '/auth/profile',
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  }

));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const location = req.body.location;
  if (username === "" || password === "" || location === "") {
    res.render("auth/signup", {
      message: "Indicate username and password"
    });
  }

  User.findOne({
    username
  }, "username", (err, user) => {
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

    newUser.save()
      .then(() => {
        res.redirect("/auth/profile");
      })
      .catch(err => {
        res.render("auth/signup", {
          message: "Something went wrong"
        });
      })
  });
});

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  (res.render('auth/profile', {
    user: req.user,
  }))
})

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
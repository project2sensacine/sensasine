const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const express = require("express");




module.exports = app => {

  // Middleware Setup
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());


  app.use(
    require("node-sass-middleware")({
      src: path.join(__dirname, "..", "public"),
      dest: path.join(__dirname, "..", "public"),
      sourceMap: true
    })

  )

  // Express View engine setup
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("view engine", "hbs");
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));


  hbs.registerHelper("ifUndefined", (value, options) => {
    if (arguments.length < 2)
      throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
    if (typeof value !== undefined) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  })

}
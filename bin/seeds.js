// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Genre = require("../models/genres.model");

const axios = require('axios')
const axiosApp = axios.create({
  baseURL: `https://api.themoviedb.org/3`
})

const bcryptSalt = 10;

mongoose
  .connect(process.env.DB_REMOTE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));


//Creates a genres collection with the genres in the API
axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.movieAPI}&language=en-US`)
  .then(results => Genre.create(results.data.genres))
  .then(genres => console.log(" se ha cargado la info en la bbdd", genres))
  .catch(err => console.log(err))

let users = [{
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
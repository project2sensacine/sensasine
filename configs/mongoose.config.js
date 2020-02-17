const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);




module.exports = app => {
mongoose
  .connect(`mongodb://localhost/${process.env.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to mongo", err));
  app.use(session({
    secret: "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));
  app.use(flash());
  require("./passport")(app);

}
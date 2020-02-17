require('dotenv').config();

const express = require('express');
const app = express();


//Conect to Data Base
require('./configs/mongoose.config')(app)
require('./configs/debugger.config')

// Middleware Setup
require('./configs/middleware.config')(app)

// Default value for title local
require('./configs/locals.configs')(app)

// Enable authentication using session + passport

require('./configs/passport')(app)

//Rutas
app.use('/', require('./routes/index.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/movies', require('./routes/movies.routes'));
app.use('/places', require('./routes/cinemas.routes'));


module.exports = app;
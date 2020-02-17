require('dotenv').config();
console.log('hola arnoldo')

const express = require('express');
const app = express();


//Conect to Data Base
require('./configs/mongoose.config')(app)
require('./configs/debugger.config')


// Middleware Setup
require('./configs/middleware.config')(app)

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// Enable authentication using session + passport

require('./configs/passport.config')
require('./configs/passport')(app)





//Rutas
const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


module.exports = app;
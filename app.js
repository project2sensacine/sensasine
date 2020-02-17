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


require('./configs/passport')(app)


//Rutas
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


module.exports = app;
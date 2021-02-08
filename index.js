const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const router = require('./routes/users');

const app = express();

//CORS config
app.use( cors() );

//Redding and Parse Body
app.use( express.json() );

//DataBase
dbConnection();

//Routes
app.use('/api/users', require('./routes/users'));

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
} );
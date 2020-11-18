const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); // some people still want to use that library

const indexRoutedPage = require('./Routes/index'); 
const workoutRoute = require('./Routes/workout');

// added configs here
const config = require('./config/');

const db_url = config.DB_URL;
const port = config.PORT || 3000; // if by somehow fails, force pick port 3000

const dbUrlOptions = { useNewUrlParser: true, poolSize: 5, useUnifiedTopology: true };

mongoose.connect(db_url, dbUrlOptions);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)=> console.log('DB::Cannot connect to server', err));
mongoose.connection.on('connected', ()=>console.log('DB::Connected!'));
mongoose.connection.on('disconnect', (msg)=>console.log('DB::Disconnected from server:', msg));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRoutedPage);
app.use('/workout', workoutRoute);

app.listen(port, ()=>console.log('Listening to port:', port));

module.exports = app;
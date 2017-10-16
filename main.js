//////////////////////////////////////////////////////////////////////
// This is the main page that runs when you start the application.  //
// It calls the routes files that contain the endpoints, which is   //
// the core of the application. Finally it starts up the app server //
// so it can respond to REST requests.                              //
////////////////////////////////////////////////////////////////////// 
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const PGConnection = require('./utilities/pgdb_connect');

const app = express();

//This string means connect to the evironment variable in predix, and if not, fallback to my local database
let connectionString = 'postgres://postgres:postgres@localhost:5432/uksoftcon17';

if (process.env.VCAP_SERVICES) {
  try {
    connectionString = JSON.parse(process.env.VCAP_SERVICES)['postgres-2.0'][0].credentials.uri;
  } catch(err) {
    console.log(err);
  }
}
const databaseConnection = new PGConnection(connectionString);

//Tools to help routing and json interpretation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Note this is a quick and dirty way to enable cors. Should not be used for production builds
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Add the routes in the routes folder into the application
const machineRoutes = require('./routes/machine.js');
machineRoutes(app, databaseConnection);

// Start-up the application server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`predix-bookings-bootcamp app running on port ${port}`);
});

module.exports = app

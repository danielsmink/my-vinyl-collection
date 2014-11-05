// server.js

// setup =================================================
var express = require('express'),
    app = express(), // create our app with express
    mongoose = require('mongoose'), // mongoose for mongodb
    morgan = require('morgan'), // log requests to the console
    bodyParser = require('body-parser'), // pull information from HTML POST
    methodOverride = require('method-override'), // simulate DELETE and PUT
    // load local modules
    database = require('./config/database'); //load database config

// configuration ==========================================

// connect with mongoDB database on modulus.io
mongoose.connect(database.url);

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(
    {
        'extended' : 'true'
    }
));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json(
    {
        'type' : 'application/vnd.api+json'
    }
));
app.use(methodOverride());

// load the routes =======================================
require('./api/routes')(app);

// listen (start app with node server.js) ================
app.listen(8080);
console.log('App listening on port 8080');
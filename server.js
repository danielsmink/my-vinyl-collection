// server.js

// setup =================================================
var express = require('express'),
    app = express(), // create our app with express
    mongoose = require('mongoose'), // mongoose for mongodb
    morgan = require('morgan'), // log requests to the console
    bodyParser = require('body-parser'), // pull information from HTML POST
    methodOverride = require('method-override'), // simulate DELETE and PUT
    mongoUser = process.env.USER, // modulus user name
    mongoPassword = process.env.PASSWORD; // modulus password

// configuration ==========================================

// connect with mongoDB database on modulus.io
mongoose.connect('mongodb://' + mongoUser + ':' + mongoPassword + '@proximus.modulusmongo.net:27017/xevyG6iq');

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + 'public'));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(
    {
        'extended':'true'
    }
));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json(
    {
        'type':'application/vnd.api+json'
    }
));
app.use(methodOverride());

// define model ==========================================
var Vinyl = mongoose.model('Vinyl', {
   title : String
});

// routes ================================================

// api ---------------------------------------------------

// get all vinyl
app.get('/api/vinyl', function(req, res) {
    // use mongoos to get all Vinyl in the database
    Vinyl.find(function(err, vinyl){
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        // return all vinyl in JSON format
        res.json(vinyl);
    });
});

// create an album and send back all vinyl objects after creation
app.post('/api/vinyl', function(req, res) {

    console.log(req.body);

    // create an album, information comes from AJAX request from Angular
    Vinyl.create({
        title : req.body.title
    }, function(err, album) {
        if (err) {
            res.send(err);
        }

        // get an return all vinyl objects after creation
        Vinyl.find(function(err, vinyl){
            if(err) {
               res.send(err);
            }

            res.json(vinyl);
        });
    });
});

// delete an album
app.delete('/api/vinyl/:vinyl_id', function(req, res) {
    Vinyl.remove({
        _id : req.params.vinyl_id
    }, function(err, album) {
        if (err) {
          res.send(err);
        }

        // get an return all vinyl after deletion
        Vinyl.find(function(err, vinyl){
            if(err) {
                res.send(err);
            }

            res.json(vinyl);
        });
    });
});

// application -------------------------------------------

app.get('*', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendfile('./public/index.html');
});

// listen (start app with node server.js) ================
app.listen(8080);
console.log('App listening on port 8080');
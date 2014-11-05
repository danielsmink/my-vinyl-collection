/**
 * Created by danielsmink on 05/11/2014.
 */

// api/routes.js

// load the vinyl model
var Vinyl = require('./models/vinyl');

// expose the routes to our app with module.exports

module.exports = function(app) {

    // api ---------------------------------------------------

    // get all vinyl
    app.get('/api/vinyl', function (req, res) {
        // use mongoos to get all Vinyl in the database
        Vinyl.find(function (err, vinyl) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            // return all vinyl in JSON format
            res.json(vinyl);
        });
    });

    // get a single album
    app.get('/api/vinyl/:vinyl_id', function (req, res) {
        // use mongoos to get a single album from the database
        Vinyl.findById(req.params.vinyl_id, function (err, album) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }

            // return all vinyl in JSON format
            res.json(album);
        });
    });

    // create an album and send back all vinyl objects after creation
    app.post('/api/vinyl', function (req, res) {
        // create an album, information comes from AJAX request from Angular
        Vinyl.create({
            title: req.body.title
        }, function (err, album) {
            if (err) {
                res.send(err);
            }

            // get an return all vinyl objects after creation
            Vinyl.find(function (err, vinyl) {
                if (err) {
                    res.send(err);
                }

                res.json(vinyl);
            });
        });
    });

    // update a single album
    app.put('/api/vinyl/:vinyl_id', function (req, res) {
        // use mongoos to get a single album from the database
        Vinyl.findById(req.params.vinyl_id, function (err, album) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            // update album data
            album.title = req.body.title;
            // save album
            album.save(function (err) {
                if (err) {
                    res.send(err);
                }
                // return album
                res.json(album);
            });
        });
    });

    // delete an album
    app.delete('/api/vinyl/:vinyl_id', function (req, res) {
        // delete an album id comes as a queryparameter
        Vinyl.remove({
            _id: req.params.vinyl_id
        }, function (err, album) {
            if (err) {
                res.send(err);
            }

            // get an return all vinyl after deletion
            Vinyl.find(function (err, vinyl) {
                if (err) {
                    res.send(err);
                }

                res.json(vinyl);
            });
        });
    });
}
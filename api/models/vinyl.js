/**
 * Created by danielsmink on 05/11/2014.
 */

// api/models/vinyl.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define model ==========================================
module.exports = mongoose.model('Vinyl', {
    title : String,
    artist : String
});
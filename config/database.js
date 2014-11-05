/**
 * Created by danielsmink on 05/11/2014.
 */

// config/database.js

var mongoUser = process.env.USER, // modulus user name
    mongoPassword = process.env.PASSWORD; // modulus password

module.exports = {
    url : 'mongodb://' + mongoUser + ':' + mongoPassword + '@proximus.modulusmongo.net:27017/xevyG6iq'
}
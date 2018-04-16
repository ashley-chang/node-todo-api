var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //set up to use promises
mongoose.connect(process.env.MONGODB_URI); //connected to database

module.exports = {mongoose};

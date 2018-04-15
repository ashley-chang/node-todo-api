var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //set up to use promises
mongoose.connect('mongodb://localhost:27017/TodoApp'); //connected to database

module.exports = {mongoose};

var mongoose = require('mongoose');

// create a model
// in mongodb, collections can store anything
// todo model has certain attributes, e.g. text, completed
// so mongoose knows how to store our database
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
}); //define various properties for model

module.exports = {Todo};

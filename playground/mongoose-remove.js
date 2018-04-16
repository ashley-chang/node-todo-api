const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });


// Todo.findOneAndRemove({_id: '5ad43bb19cc29f0195982d18'}).then((todo) => {
//
// });

Todo.findByIdAndRemove('5ad43bb19cc29f0195982d18').then((todo) => {
  console.log(todo);
});

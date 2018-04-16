const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5ad313ddc49f9d11c4db78a7';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id //mongoose takes string, convert to object id, run query
//   //don't need to manually convert string to object id
// }).then((todos) => { //get all todos back
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));//pass in id as argument

var id = '5ad0635dd2add0073f7808e4';

//CHALLENGE
//use User.findByID to query id picked
//handle 3 cases: query works, but no user (user not found); user found (print to screen); handle errors (print err obj)
User.findById(id).then((user) => {
  if (!user) {
      return console.log('User not found');
  }

  console.log('User found: ', user);
}).catch((e) => console.log(e));

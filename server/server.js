var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//create resource -- use post HTTP method, send resource as body
//making new todo -- send new JSON object to server with text property

app.post('/todos', (req,res) => { //for resource creation
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
//add one Todo
// var newTodo = new Todo({
//   // text: 'Finish drawing', //could stop here because no required attr
//   // completed: true,
//   // completedAt: 1800
// }); //constructor function

// newTodo.save().then((doc)=> {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save Todo');
// }); //returns a promise

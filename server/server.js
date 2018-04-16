require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT //set if app running on Heroku

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

//responsible for returning all todos
//register get route handler to get information
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos}); //using object as opposed to array opens up flexibility
  }, (e) => {
    res.status(400).send(e);
  });
});

//:id creates id variable on req obj that can be accessed
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //validate ID using isValid
    //stop function exec and respond with 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  //get id
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up on port ${port}`);
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

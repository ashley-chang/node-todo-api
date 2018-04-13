//const MongoClient = require('mongodb').MongoClient;

//destructuring
const {MongoClient, ObjectID} = require('mongodb'); //creates variable called MongoClient
//sets equal to property MongoClient of mongodb
//make new object IDs on the fly

// var obj = new ObjectID(); //new instance of ObjectID
// console.log(obj);

// var user = {name: 'Ashley', age: 21};
// var {name} = user; //destructure user object, pulling off name property, creating new name variable and setting it equal to whatever name is
// console.log(name);

//connect to database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to conenct to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text:'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  // db.collection('Users').insertOne({
  //   name: "Ashley",
  //   age: 21,
  //   location: "California"
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert User", err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  db.close();
});

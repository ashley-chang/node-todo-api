//const MongoClient = require('mongodb').MongoClient;

//destructuring
const {MongoClient, ObjectID} = require('mongodb'); //creates variable called MongoClient
//sets equal to property MongoClient of mongodb
//make new object IDs on the fly

//connect to database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to conenct to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany -- target many docs and remove them
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });
  // findOneAndDelete -- remove indiv item and return values
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Ashley'}).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5acf1039525b97479c9a21ef')}).then((result) => {
    console.log(result);
  });

  //db.close();
});

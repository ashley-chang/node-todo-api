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

  // db.collection('Todos').find({
  //   _id: new ObjectID('5acf0f3ce1bdc54797e9f6ec')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // }); //returns a MongoDB cursor--a pointer to documents
  //cursor has methods to get documents
  //toArray is array of documents, returns a promise

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Ashley'}).toArray().then((docs) => {
    console.log('Objects');
    console.log(JSON.stringify(docs, undefined, 2));
  });


  //db.close();
});

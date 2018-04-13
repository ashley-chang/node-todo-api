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

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5ad050e49cc29f019597f584')
  // }, {
  //   //updates using update operators
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    name: 'Mike'
  }, {
    $set: {
      name: 'Ashley'
    },
    $inc: {
      age: 2
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });


  //db.close();
});

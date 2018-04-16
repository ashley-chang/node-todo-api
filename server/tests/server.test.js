const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require ('./../models/todo');

// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {//asynch test
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(
        (res) => {
          expect(res.body.text).toBe(text);
        }
      )
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => { //check database
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
          }).catch((e) => done(e));
        });
      });

    it('should not create todo with invalid body data', (done) => {
      request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
    });
});

describe('POST /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done); //only have function for done if asynchronous
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done)=> {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var someID = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${someID}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if invalid ID', (done) => {
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var someID = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${someID}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(someID);
    })
    //query the database to make sure it was actually removed
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(someID).then((todo) => {
        expect(todo).toBe(null);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    var someID = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${someID}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if objectID is invalid', (done) => {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });
});

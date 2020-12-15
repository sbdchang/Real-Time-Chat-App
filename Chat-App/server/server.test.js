//import testing framework
const request = require('supertest');

// import mongoose module
const { connect } = require("mongoose");

// Import ObjectID constructor
const ObjectId = require('mongodb').ObjectID;

// URL of test db on the cloud TODO how do I get this to connect to my personal test server on the cloud?
const url = 'mongodb+srv://jroypeterson@gmail.com:3du6tKXST4zU@cluster0.n47tz.mongodb.net/CHAT-APP-TEST-SERVER?retryWrites=true&w=majority';


//test that tests here work
it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});


/*
// Connect to our db on the cloud using mongoose.js file
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Mongo Atlas connected.")
}).catch(error => {
    console.log(error);
});

const webapp = require('./index'); // TODO correct? using webapp in the index.js file

let db;
beforeAll(async () => {
  db = await connect();
});

const clearDatabase = async () => {
    try {
      const result = await db.collection('players').deleteOne({ player: 'testuser' });
      const { deletedCount } = result;
      if (deletedCount === 1) {
        console.log('info', 'Successfully deleted player');
      } else {
        console.log('warning', 'player was not deleted');
      }
    } catch (err) {
      console.log('error', err.message);
    }
  };
  
  afterAll(async () => {
    await clearDatabase();
  });

//TODO actually create the tests

// id of inserted user
let id;

// test get

describe('Test GET', () => {
  test('Endpoint response', () => request(webapp).get('/status').send()
    .expect(200))
});


describe('Register user endpoint integration test', () => {
    // expected response
    const testPlayer = {
      username: 'testuser123456',
      email: 'test123456@gmail.com',
      password: 'qwertyui!',
      pin: '123456789',
      
    };
    test('Endpoint status code and response', () => request(webapp).post('/users/add').send('username=testuser')
      .expect(200)
      .then((response) => {
        // toMatchObject check that a JavaScript object matches
        // a subset of the properties of an object
        const { player } = JSON.parse(response.text);
        id = player._id;
        expect(player).toMatchObject(testPlayer);
      }));
  
    test('The new player is in the database', async () => {
      const insertedUser = await db.collection('players').findOne({ _id: new ObjectId(id) });
      expect(insertedUser.player).toEqual('testuser');
    });
  });

*/

// Test Register

// Test login

//add 

//remove

//status

//reset

//delete

//log out


//logout all


//post Status

//post image status



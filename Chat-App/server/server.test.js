// POtential test dependencies when using mongoose
//const time = require('./time');
//const sinon = require('sinon');
//sinon.stub(time, 'setTimeout');

const mongoose = require("mongoose"); // import mongoose module
/*
MongoDB access
64Lt0KiQaU4m2DLR
test_jp_user
*/

//imported from user.js and index.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//following line ensures mongoose.js runs and mongoose connects to the database
const userRouter = require("./src/routers/user.js");
const statusRouter = require("./src/routers/status");
const messageRouter = require("./src/routers/message");
const User = require("./src/models/user");
const auth = require("./src/middleware/auth");
const router = new express.Router();
const { videoToken } = require('./src/routers/tokens');
const multer = require("multer");
const upload = multer({
    dest: "uploads/",
});
const fs = require("fs");
const { EWOULDBLOCK } = require("constants");
const app = express();
app.use(cors);

const request = require('supertest'); //import testing framework

// Import ObjectID constructor
const ObjectId = require('mongodb').ObjectID;

// URL of test db on the cloud TODO how do I get this to connect to my personal test server on the cloud?
//const url = "mongodb+srv://stevenc61500@gmail.com:WYFmYZ)Bx[%3Aqt5ZT4Kmp@557-chat-app-cluster.jbh5s.mongodb.net/557-Chat-App?retryWrites=true&w=majority";
//const url = "mongodb+srv://test_jp_user:64Lt0KiQaU4m2DLR@557-chat-app-cluster.jbh5s.mongodb.net/557-chat-app?retryWrites=true&w=majority"
const url = "mongodb+srv://test_user:test_user@557-chat-app-cluster.jbh5s.mongodb.net/test?retryWrites=true&w=majority";
// const url = 'mongodb+srv://jroypeterson@gmail.com:3du6tKXST4zU@cluster0.n47tz.mongodb.net/CHAT-APP-TEST-SERVER?retryWrites=true&w=majority';

beforeAll(async () => {
  try{
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
      useCreateIndex: true,
      useFindAndModify: false
  });
  console.log("Mongo Atlas connected.")
  } catch (err){
    console.log(err);
  }
});

//are the tests working
  it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
  });


  it('Should save user to database', async done => {
    const res = await router.post("/users/register")
    .send({
        name: 'Zell',
        email: 'Zelltest@gmail.com',
        password: 'Zellpwordpword'
      })
  
    // Searches the user in the database
    const user = await User.findOne({ email: 'Zelltest@gmail.com' })
    console.log(User)
    expect(User.name).toBeTruthy()
    expect(User.email).toBeTruthy()

    done()
  })

  describe('Post Endpoints', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/users/register')
        .send({
          name: 'ZellZell',
          email: 'Zelltesttest@gmail.com',
          password: 'Zellpwordpwordpword'
        })
      expect(res.statusCode).toEqual(200)
    })
  })



describe('Test GET', () => {
  test('Endpoint response', async () => await request(app).get('/status').send()
    .expect(200))
});



/*
//this seems to cause error when used. Maybe index is already imported so don't need
const webapp = require('./index'); // TODO correct? using webapp in the index.js file

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


*/
/*
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



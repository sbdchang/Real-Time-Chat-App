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
const multer = require("multer");
const upload = multer({
    dest: "uploads/",
});
const fs = require("fs");
const { EWOULDBLOCK } = require("constants");
const supertest = require('supertest');

//Import custom modules
const app = require('./src/index.js'); //original file

const userRouter = require("./src/routers/user.js");
const statusRouter = require("./src/routers/status");
const messageRouter = require("./src/routers/message");
const User = require("./src/models/user");
const auth = require("./src/middleware/auth");
const { videoToken } = require('./src/routers/tokens');
// const app = express(); imported from user.js

const ObjectId = require('mongodb').ObjectID; // Import ObjectID constructor
const API_URL = "http://localhost:8081";
//const request = supertest(app)


//mongoDB url connections
//const url = "mongodb+srv://stevenc61500@gmail.com:WYFmYZ)Bx[%3Aqt5ZT4Kmp@557-chat-app-cluster.jbh5s.mongodb.net/557-Chat-App?retryWrites=true&w=majority";
//const url = "mongodb+srv://test_jp_user:64Lt0KiQaU4m2DLR@557-chat-app-cluster.jbh5s.mongodb.net/557-chat-app?retryWrites=true&w=majority"
const url = "mongodb+srv://test_user:test_user@557-chat-app-cluster.jbh5s.mongodb.net/test?retryWrites=true&w=majority";
// const url = 'mongodb+srv://jroypeterson@gmail.com:3du6tKXST4zU@cluster0.n47tz.mongodb.net/CHAT-APP-TEST-SERVER?retryWrites=true&w=majority';

//connec to DB
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

//Tests that tests are working generally
  it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
  });

//Test get all users function
it('Gets the test endpoint', async done => {
    // Sends GET Request to /test endpoint
  const res = await request.get('/users')
  done()
})

/*
//Test get all users function
it('Test return all users in db', async () => {
  const res = await userRouter.get(`${API_URL}/status/users`)
  console.log(res)
  expect(res).toBeTruthy();
  // Searches the user in the database
  //const user = await User.findOne({ email: 'Zelltest@gmail.com' })    
  //expect(User.email).toBeTruthy()
  /*
  await fetch(`${API_URL}/status/users`, {
    method: "POST"
  }).then((response) => {
    console.log(response);
    ;
  })
 
})
*/

/*
//Test register user to db
  it('Should save user to database', async () => {
    const res = await userRouter.post('/users/register?username=Zell&email=Zelltest@gmail.com&password=Zellpword1!&pin=12345678')
    console.log(res)
    expect(res).toBeTruthy();
    // Searches the user in the database
    //const user = await User.findOne({ email: 'Zelltest@gmail.com' })
    
    expect(res.email).toBeTruthy();
    //expect(User.email).toBeTruthy()
  })
*/

// test login - use already created test user
  
//test /users to get all users currently logged in. Should be >0

// test change password router.post("/users/change", cors(), async (req, res) => {
    //use zell original password - Zellpword1!
    //new password Zellpword10!



//Test reset password - create router.post("/users/login/reset", cors(), async (req, res) => {



//test get user by ID. user by id - router.get("/users/:id", cors(), async (req, res) => {
  //object ID of username't1' = 5fc6efbee9129db0f6bd2b48
  //email is 't1@gmail.com'
  

//test logout

//login again

// lougout one router.post('/logout_one', async (req, res) => {

//test logout all


//delete by Id - router.delete("/users/delete/:id", cors(), async (req, res) => {

// test remove router.post("/users/remove", cors(), async (req, res) => {
  //find and expect Null


/* DON"T DO 
//remove sample user from db  - already done with remove above
const clearDatabase = async () => {
  try {
    const result = await db.collection('users').deleteOne({ username: 'Zell' });
    const { deletedCount } = result;
    if (deletedCount === 1) {
      console.log('info', 'Successfully deleted Zell');
    } else {
      console.log('warning', 'Zell was not deleted');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};

//clear the db of test user
afterAll(async () => {
  await clearDatabase();
});
*/
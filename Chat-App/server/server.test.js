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
// const app = express();
// app.use(cors);

const request = require('supertest'); //import testing framework

const app = require("./src/index.js");

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

describe('Tests backend /users', () => {

  it('Testing to get /users', async () => {
    const res = await request(app).get("/users").expect(200);
    const body = res.body;
    expect(body).toBeTruthy();
  });
});

describe('Tests backend /users/date', () => {

  it('Testing to get /users/date', async () => {
    const res = await request(app).get("/users/date?username=vvvv").expect(200);
    const body = res.body;
    expect(body).toBeTruthy();
  });
});

describe('Tests backend /users/:id', () => {

  it('Testing to get /users/:id', async () => {
    const res = await request(app).post("/users/1").expect(404);
    // We expect it to not exist!
  });
});

describe('Tests backend get /video/token', () => {

  it('Testing to get /video/token', async () => {
    const res = await request(app).post("/video/token?identity=james&room=james").expect(200);
    const body = res.body;
    expect(body).toBeTruthy();
  });
});

describe('Tests backend get /users/register', () => {

  it('Testing to get /users/register', async () => {
    const res = await request(app).post("/users/register?identity=james&room=james").expect(461);
    // const body = res.body;
    // expect(body).toBeTruthy();
  });
});

describe('Tests backend get getting_video_chat', () => {

  it('Testing to get getting_video_chat', async () => {
    const res = await request(app).post("/getting_video_chat?callee=test").expect(404);
    // const body = res.body;
    // expect(body).toBeTruthy();
    // We expect it to not exist!
  });
});

describe('Tests backend /users/login', () => {

  it('Testing to post /users/login', async () => {
    const res = await request(app)
      .post("/users/login?username=ewr&password=jimmy2@212313")
      .expect(200);
    const body = res.body;
    expect(body).toBeTruthy();
  });
});

describe('Tests backend /users/login/reset', () => {

  it('Testing to post /users/login/reset', async () => {
    const res = await request(app)
      .post("/users/login/reset?username=ewr&rpin=12345678")
      .expect(470);
      // expect to be under lockdown!
  });
});

describe('Tests backend /users/logout', () => {

  it('Testing to post /users/logout', async () => {
    const res = await request(app)
      .post("/users/logout")
      .expect(401);
      // expect to be unauthorized!
    // const body = res.body;
    // expect(body).toBeTruthy();
  });
});

describe('Tests backend /users/logoutall', () => {

  it('Testing to post /users/logoutall', async () => {
    const res = await request(app)
      .post("/users/logoutall")
      .expect(401);
      // expect to be unauthorized!
  });
});

describe('Tests backend /users/deactivate', () => {

  it('Testing to post /users/deactivate', async () => {
    const res = await request(app)
      .post("/users/deactivate?username=ewr")
      .send({ username: "ewr"})
      .expect(200);
      // expect to be able to find this user
  });
});

describe('Tests backend /users/change', () => {

  it('Testing to post /users/change', async () => {
    const res = await request(app)
      .post("/users/change?username=vvvv&cpw=jimmy123@1!!2&npw=jimmy123@1!!2")
      // Expect wrong current password
      .expect(400);
  });
});

describe('Tests backend /users/add', () => {

  it('Testing to post /users/add', async () => {
    const res = await request(app)
      .post("/users/add?username=ewr&contact=vvvv")
      .expect(200);
      // expect to be able to find this user
  });
});

describe('Tests backend /users/addRec', () => {

  it('Testing to post /users/addRec', async () => {
    const res = await request(app)
      .post("/users/addRec?username=ewr&contact=vvvv")
      .expect(200);
      // expect to be able to find this user
  });
});

describe('Tests backend /users/remove', () => {

  it('Testing to post /users/remove', async () => {
    const res = await request(app)
      .post("/users/remove?username=ewr&contact=vvvv")
      .expect(200);
      // expect to be able to find this user
  });
});

describe('Tests backend /users/shuffle', () => {

  it('Testing to post /users/shuffle', async () => {
    const res = await request(app)
      .post("/users/shuffle?receiver=ewr&sender=vvvv")
      .expect(200);
      // expect to be able to find this user
  });
});

describe('Tests backend /video/token', () => {

  it('Testing to post /video/token', async () => {
    const res = await request(app)
      .post("/video/token?identity=ewr&room=vvvv")
      .expect(200);
      const body = res.body;
      expect(body).toBeTruthy();
  });
});

describe('Tests backend /videochat', () => {

  it('Testing to post /videochat', async () => {
    const res = await request(app)
      .post("/videochat")
      .send({ callee: "ewr", caller: "vvvv"})
      .expect(200);
  });
});


describe('Tests backend /message', () => {

  it('Testing to get /message', async () => {
    const res = await request(app).get("/message?username=ewr")
    .expect(200);
    const body = res.body;
    expect(body).toBeTruthy();
  });
});

describe('Tests backend /message/read', () => {

  it('Testing to post /message/read', async () => {
    const res = await request(app)
      .post("/message/read?sender=ewr&receiver=vvvv")
      .expect(200);
  });
});

describe('Tests backend /message/deliver', () => {

  it('Testing to post /message/deliver', async () => {
    const res = await request(app)
      .post("/message/deliver?receiver=vvvv")
      .expect(200);
  });
});

describe('Tests backend /message/deleteall', () => {

  it('Testing to post /message/deleteall', async () => {
    const res = await request(app)
      .post("/message/deleteall?sender=ewr&receiver=vvvv")
      .expect(200);
  });
});

describe('Tests backend /message/delete', () => {

  it('Testing to post /message/delete', async () => {
    const res = await request(app)
      .post("/message/delete?index=0")
      .expect(200);
  });
});

describe('Tests backend /message/video', () => {

  it('Testing to post /message/video', async () => {
    const res = await request(app)
      .post("/message/video?index=0")
      .expect(400);
      // We expect this to not work! It's fine because we don't have video
  });
});

describe('Tests backend /message/audio', () => {

  it('Testing to post /message/audio', async () => {
    const res = await request(app)
      .post("/message/audio?index=0")
      .expect(400);
      // We expect this to not work! It's fine because we don't have video
  });
});

describe('Tests backend /message/image', () => {

  it('Testing to post /message/image', async () => {
    const res = await request(app)
      .post("/message/image?index=0")
      .expect(400);
      // We expect this to not work! It's fine because we don't have video
  });
});

describe('Tests backend /message/text', () => {

  it('Testing to post /message/text', async () => {
    const res = await request(app)
      .post("/message/text?sender=ewr&receiver=vvvv&text=muchlove")
      .expect(200);
      // We expect this to work because the message matches what we expect
  });
});



describe('Tests backend /logout_one', () => {

  it('Testing to post /logout_one', async () => {
    const res = await request(app)
      .post("/logout_one?username=ewr")
      .send({ username: "ewr"})
      .expect(200);
      // We expect this to work because the message matches what we expect
  });
});

//
// describe('Tests backend', () => {
//
//   it('Testing to get /users', async () => {
//     const res = await request(app).get("/users").expect(200);
//   });
// });
//
//
//
// describe('Tests backend', () => {
//
//   it('Testing to get /users', async () => {
//     const res = await request(app).get("/users").expect(200);
//   });
// });
//
// describe('Tests backend', () => {
//
//   it('Testing to get /users', async () => {
//     const res = await request(app).get("/users").expect(200);
//   });
// });
//
// describe('Tests backend', () => {
//
//   it('Testing to get /users', async () => {
//     const res = await request(app).get("/users").expect(200);
//     console.log(res.body);
//   });
// });
// describe('Tests backend', () => {
//
//   it('Testing to get /users', async () => {
//     const res = await request(app).get("/users").expect(200);
//   });
// });
// describe('Tests backend', () => {
//
//   it('Testing to get /users', async () => {
//     const res = await request(app).get("/users").expect(200);
//   });
// });

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

// import mongoose module
const mongoose = require("mongoose");

//import testing framework
const request = require('supertest');

// Import MongoDB module
const { MongoClient } = require('mongodb');

// Import ObjectID constructor
const ObjectId = require('mongodb').ObjectID;

// Import ObjectID constructor
//const ObjectId = require('mongodb').ObjectID;

// URL of test db on the cloud TODO how do I get this to connect to my personal test server on the cloud?
//const url = "mongodb+srv://stevenc61500@gmail.com:WYFmYZ)Bx[%3Aqt5ZT4Kmp@557-chat-app-cluster.jbh5s.mongodb.net/557-Chat-App?retryWrites=true&w=majority";
const url = "mongodb+srv://test_user:test_user@557-chat-app-cluster.jbh5s.mongodb.net/test?retryWrites=true&w=majority";

//Connect to our database on cloud
// const url = 'mongodb+srv://jroypeterson@gmail.com:3du6tKXST4zU@cluster0.n47tz.mongodb.net/CHAT-APP-TEST-SERVER?retryWrites=true&w=majority';
const connect = async () => {
    try {
        const tmp = (await mongoose.connect("mongodb://127.0.0.1:27017/chat-app-api", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }));
        // Connected to db
        console.log(`Connected to database`);
        return tmp;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

let db;
beforeAll(async () => {
    db = await connect();
});

// beforeAll(async () => {
//     try {
//         // // This is for database on cloud
//         // await mongoose.connect(url, {
//         //   useNewUrlParser: true,
//         //   useUnifiedTopology: true,
//         //   useCreateIndex: true,
//         //   useFindAndModify: false
//         // });
//         // // This is for local database
//         await mongoose.connect("mongodb://127.0.0.1:27017/chat-app-api", {
//             useNewUrlParser: true,
//             useCreateIndex: true,
//             useFindAndModify: false
//         });
//         console.log("Database connected.")
//     } catch (err) {
//         console.log(err);
//     }
// });

const chatapp = require('./user');

// describe('Tests backend', () => {

//     it('Testing to see if Jest works', () => {
//         expect(1).toBe(1);
//     });
// });

// describe('Create user endpoint integration test', () => {
//     // expected response
//     const testUser = {
//         user: 'testuser',
//     };
//     //await testUser.save();
//     test('Endpoint status code and response', () => request(router).post('/users/register').send(testUser)
//         .expect(460)
//         .then((response) => {
//             // toMatchObject check that a JavaScript object matches
//             // a subset of the properties of an object
//             const { user } = JSON.parse(response.text);
//             id = user.username;
//             expect(user).toMatchObject(testUser);
//         }));
// });
const { connect } = require("mongoose");


//import testing framework
const request = require('supertest');

const {MongoClient} = require('mongodb');

//Import ObjectId constructor
const ObjectId = require('mongodb').ObjectID;


//url of the db in the cloud


//wait to connect to the db
let db;
beforeAll(async ()=>{
    db = await connect();
});


//test that player is in db TODO
test('The new player is in the database', async () => { const insertedUser = await db.collection('players')
.findOne({ _id: new ObjectId(id) }); expect(insertedUser.player).toEqual('testuser');
});
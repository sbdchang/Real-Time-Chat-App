// CRUD operations: Create, Read, Update, Delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.objectID;
// line below is shorthand for the 3 lines above, using destructuring
const {MongoClient, ObjectID} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    // this asynchronous callback function gets called when connected to database
    
    if (error) {
        return console.log("Unable to connect to database.");
    }

    // create a reference to the database; can now use this variable to manipulate the database
    const db = client.db(databaseName);


    // db.collection("users").insertOne({
    //     // this object should contain all the information to insert to the users collection
    //     // underscore id sets this field to a value of your choosing, in this case, set id of this person to the id generated above
    //     _id: id,
    //     name: "Steve",
    //     age: 24
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert user.");
    //     }

    //     // result.ops returns an array of all the documents inserted, in this case, just one
    //     console.log(result.ops);
    // })

    // db.collection("users").insertMany([
    //     {
    //         name: "Jen",
    //         age: 28
    //     }, {
    //         name: "Gunther",
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert users.");
    //     }

    //     console.log(result.ops);
    // })

    // db.collection("tasks").insertMany([
    //     {
    //         description: "Review benefits package",
    //         completed: true
    //     }, {
    //         description: "Compare other offers",
    //         completed: true
    //     }, {
    //         description: "Accept or decline offer",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert tasks.");
    //     }

    //     console.log(result.ops);
    // })

    // db.collection("users").findOne({ _id: new ObjectID("5f94d69486941009fa7564d4")}, (error, user) => {
    //     if (error) {
    //         console.log("Unable to fetch this user.");
    //     }

    //     console.log(user);
    // })

    // db.collection("users").find({ age: 24 }).toArray((error, users) => {
    //     if (error) {
    //         console.log("Unable to fetch results.");
    //     }

    //     console.log(users);
    // })

    // db.collection("users").find({ age: 24 }).count((error, count) => {
    //     if (error) {
    //         console.log("Unable to fetch count.");
    //     }

    //     console.log(count);
    // })

    // db.collection("tasks").findOne({ _id: new ObjectID("5f94e2031d110a0b322f9a1a") }, (error, task) => {
    //     if (error) {
    //         console.log("Unable to fetch task.");
    //     }

    //     console.log(task);
    // })

    // db.collection("tasks").find({ completed: false }).toArray((error, incompleteTasks) => {
    //     if (error) {
    //         console.log("Unable to fetch incomplete tasks.");
    //     }

    //     console.log(incompleteTasks);
    // })

    // db.collection("users").updateOne({
    //     _id: new ObjectID("5f94d4bfc1f65f09a13d054d")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {   //returns a Promise, which allows us to access its methods
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection("tasks").updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // db.collection("users").deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection("tasks").deleteOne({
        description: "Accept or decline offer"
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
})


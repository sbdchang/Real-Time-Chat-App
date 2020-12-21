const mongoose = require("mongoose");
const validator = require("validator");

//use lines 5 to 15 to connect to MongoDB Atlas database
const uri = "mongodb+srv://test_user:test_user@557-chat-app-cluster.jbh5s.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Mongo Atlas connected.")
}).catch(error => {
    console.log(error);
});

// //use lines 18-22 to use local MongoDB database
// mongoose.connect("mongodb://127.0.0.1:27017/chat-app-api", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });


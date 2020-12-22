const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//following line ensures mongoose.js runs and mongoose connects to the database
require("./db/mongoose");
const userRouter = require("./routers/user");
const statusRouter = require("./routers/status");
const messageRouter = require("./routers/message");
// const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 8081

//automatically parse incoming JSON to an object that can be accessed later
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(statusRouter);
app.use(messageRouter);
// app.use(taskRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port);
});

// const jwt = require("jsonwebtoken");

// const myFunction = async() => {
//     const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", { expiresIn: "7 days" });
//     console.log(token);

//     const data = jwt.verify(token, "thisismynewcourse");
//     console.log(data);
// }

// myFunction();
module.exports = app;

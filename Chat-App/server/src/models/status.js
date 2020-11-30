const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const statusSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    statusContent: {
        type: String,
        default: ""
    },
    statusImage: {
        data: Buffer,
        contentType: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

})

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;

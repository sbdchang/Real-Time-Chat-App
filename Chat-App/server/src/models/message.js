const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    text: {
        type: String,
        default: ""
    },
    image: {
        data: Buffer,
        contentType: String
    },
    audio: {
        data: Buffer,
        contentType: String
    },
    video: {
        data: Buffer,
        contentType: String
    },
    index: {
        type: Number,
        default: 0
    },
    receipt: {
        type: Number,
        default: 0
    }
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;

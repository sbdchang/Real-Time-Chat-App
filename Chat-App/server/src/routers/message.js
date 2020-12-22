const express = require("express");
const User = require("../models/user");
const Message = require("../models/message");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
    dest: "uploads/",
});
const cors = require("cors");
const router = new express.Router();
const app = express();
app.use(cors);

router.post("/message/text", cors(), async (req, res) => {
    const message = new Message(req.query);
    const messages = await Message.find();
    if (messages.length > 0) {
        message.index = messages[messages.length-1].index + 1;
    }
    try {
        await message.save();
        res.status(200).json(message);
    } catch(e) {
        // res.status(400).send(e);
      }
});

router.post("/message/image", cors(), upload.single("image"), async (req, res) => {
    try {
    const message = new Message(req.query);
    const messages = await Message.find();
    if (messages.length > 0) {
        message.index = messages[messages.length-1].index + 1;
    }
    message.image.data = fs.readFileSync(req.file.path);
    message.image.contentType = "image/png";
        await message.save();
        res.status(200).send(message);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post("/message/audio", cors(), upload.single("audio"), async (req, res) => {
    try {
    const message = new Message(req.query);
    const messages = await Message.find();
    if (messages.length > 0) {
        message.index = messages[messages.length-1].index + 1;
    }
    message.audio.data = fs.readFileSync(req.file.path);
    message.audio.contentType = "audio/mp3";

        await message.save();
        res.status(200).send(message);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post("/message/video", cors(), upload.single("video"), async (req, res) => {
    try {
    const message = new Message(req.query);
    const messages = await Message.find();
    if (messages.length > 0) {
        message.index = messages[messages.length-1].index + 1;
    }
    message.video.data = fs.readFileSync(req.file.path);
    message.video.contentType = "video/mp4";
        await message.save();
        res.status(200).send(message);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post("/message/delete", cors(), async (req, res) => {
    try {
        await Message.deleteOne({index: req.query.index});
        res.status(200).send();
    } catch(e) {
        // res.status(400).send(e);
    }
});

router.post("/message/deleteall", cors(), async (req, res) => {
    try {
        await Message.deleteMany({$or:[{sender: req.query.sender, receiver: req.query.receiver},
            {sender: req.query.receiver, receiver: req.query.sender}]});
        res.status(200).send();
    } catch(e) {
        // res.status(400).send(e);
    }
});

router.post("/message/deliver", cors(), async (req, res) => {
    try {
        const messages = await Message.find({receiver: req.query.receiver});
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].receipt === 0) {
                messages[i].receipt = 1;
                await messages[i].save();
            }
        }
        res.status(200).send();
    } catch(e) {
        // res.status(400).send(e);
    }
});

router.post("/message/read", cors(), async (req, res) => {
    try {
        const messages = await Message.find({sender: req.query.sender, receiver: req.query.receiver});
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].receipt === 1) {
                messages[i].receipt = 2;
                await messages[i].save();
            }
        }
        res.status(200).send();
    } catch(e) {
        // res.status(400).send(e);
    }
});

router.get("/message", cors(), async (req, res) => {
    try {
        const messages = await Message.find({$or:[{sender: req.query.sender, receiver: req.query.receiver},
            {sender: req.query.receiver, receiver: req.query.sender}]});
        var messages_stripped = [];
        for(var i = 0; i < messages.length; i++) {
            messages_stripped.push({sender: messages[i].sender, receiver: messages[i].receiver, text: messages[i].text,
                image: messages[i].image, audio: messages[i].audio, video: messages[i].video, index: messages[i].index,
                receipt: messages[i].receipt});
        }
        res.json(messages_stripped);
    } catch(e) {
        // res.status(500).send();
    }
});

module.exports = router;

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
    try {
        await message.save();
        res.status(200).send(message);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post("/message/image", cors(), upload.single("image"), async (req, res) => {
    const message = new Message(req.query);
    await message.save();
    message.image.data = fs.readFileSync(req.file.path);
    message.image.contentType = "image/png";
    try {
        await message.save();
        res.status(200).send(message);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post("/message/audio", cors(), upload.single("audio"), async (req, res) => {
    const message = new Message(req.query);
    await message.save();
    message.audio.data = fs.readFileSync(req.file.path);
    message.audio.contentType = "audio/mp3";
    try {
        await message.save();
        res.status(200).send(message);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.post("/message/video", cors(), upload.single("video"), async (req, res) => {
    const message = new Message(req.query);
    await message.save();
    message.video.data = fs.readFileSync(req.file.path);
    message.video.contentType = "video/mp4";
    try {
        await message.save();
        res.status(200).send(message);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get("/message", cors(), async (req, res) => {
    try {
        const messages = await Message.find({$or:[{sender: req.query.sender, receiver: req.query.receiver},
            {sender: req.query.receiver, receiver: req.query.sender}]});
        var messages_stripped = [];
        for(var i = 0; i < messages.length; i++) {
            messages_stripped.push({sender: messages[i].sender, receiver: messages[i].receiver, text: messages[i].text,
                image: messages[i].image, audio: messages[i].audio, video: messages[i].video});
        }
        res.json(messages_stripped);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;

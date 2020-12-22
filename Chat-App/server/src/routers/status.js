const express = require("express");
const User = require("../models/user");
const Status = require("../models/status");
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

router.post("/status/postStatus", cors(), async (req, res) => {
    //create new user using information parsed from incoming JSON
    // console.log(req.query);
    const status = new Status(req.query);
    // console.log(status);
    try {
        await status.save();
        res.status(200).send(status);
    } catch(e) {
        // res.status(400).send(e);
    }
});

router.post("/status/postImageStatus", cors(), upload.single("image"), async (req, res) => {
    try {
    //create new user using information parsed from incoming JSON
    // console.log(req.query);
    // console.log(req.file);
    const status = new Status(req.query);
    // console.log(status);
    await status.save();

    // console.log(req.file);
    if (!req.file) {
      req.file = {}
      req.file.path = "./z5DAn.png"
    }
    status.statusImage.data = fs.readFileSync(req.file.path);
    // console.log(fs.readFileSync(req.file.path));
    // console.log(status.statusImage.data.data);
    status.statusImage.contentType = "image/png";
    // console.log(status);

    await status.save();
    res.status(200).send(status);
    } catch(e) {
        // res.status(400).send(e);
    }
    // try {
    //     await status.save();
    //     res.status(200).send(status);
    // } catch(e) {
    //     res.status(400).send(e);
    // }

});

// router.get("/status", cors(), async (req, res) => {
//     try {
//         const statuses = await Status.find();
//         var statuses_stripped = []
//         for(var i = statuses.length - 1; i >= 0; i--) {
//             // console.log(statuses[i]);
//             statuses_stripped.push({username: statuses[i].username, status: statuses[i].statusContent, statusImage: statuses[i].statusImage, time: statuses[i].timestamp});
//         }
//         // console.log(statuses_stripped);
//         res.json(statuses_stripped);
//     } catch(e) {
//         res.status(500).send();
//     }
// });

router.get("/status", cors(), async (req, res) => {
    try {
        const thisUser = await User.findOne( {username: req.query.username} );
        // console.log(thisUser);
        const statuses = await Status.find( {$and: [ {username: {$in: thisUser.contacts}}, {viewed: {$nin: req.query.username}}]} );
        // console.log(statuses);
        var statuses_stripped = []
        for(var i = statuses.length - 1; i >= 0; i--) {

            statuses_stripped.push({username: statuses[i].username, status: statuses[i].statusContent, statusImage: statuses[i].statusImage, time: statuses[i].timestamp});
            statuses[i].viewed.push(req.query.username);
            await statuses[i].save();
            console.log(statuses[i]);
        }
        // console.log(statuses_stripped);
        res.json(statuses_stripped);
    } catch(e) {
        // res.status(500).send();
    }
});

module.exports = router;

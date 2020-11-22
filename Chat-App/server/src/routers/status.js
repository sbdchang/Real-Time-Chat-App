const express = require("express");
const User = require("../models/user");
const Status = require("../models/status");
const auth = require("../middleware/auth");
const cors = require("cors");
const router = new express.Router();

const app = express();
app.use(cors);

router.post("/status/postStatus", cors(), async (req, res) => {
    //create new user using information parsed from incoming JSON
    console.log(req.query);
    const status = new Status(req.query);
    console.log(status);
    try {
        await status.save();
        res.status(200).send(status);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get("/status", cors(), async (req, res) => {
    try {
        const statuses = await Status.find();
        var statuses_stripped = []
        for(var i = statuses.length - 1; i >= 0; i--) {
          statuses_stripped.push({username: statuses[i].username, status: statuses[i].statusContent, time: statuses[i].timestamp});
        }
        
        res.json(statuses_stripped);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;
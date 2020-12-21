const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const cors = require("cors");
const router = new express.Router();
const { videoToken } = require('./tokens');
const multer = require("multer");
const upload = multer({
    dest: "uploads/",
});
const fs = require("fs");
const { EWOULDBLOCK } = require("constants");
const config = require('./config');

const app = express();
app.use(cors);

router.post("/users/register", cors(), async (req, res) => {
    //create new user using information parsed from incoming JSON
    const user = new User(req.query);
    try {
        await user.save();
        res.status(200).send(user);
    } catch (e) {
        if (e.code === 11000) {
            res.status(460).send(e);
        } else if (e.errors.email) {
            console.log("email");
            res.status(461).send(e);
        } else if (e.errors.password) {
            console.log("password");
            res.status(462).send(e);
        } else if (e.errors.pin) {
            console.log("pin");
            res.status(463).send(e);
        } else {
            res.status(464).send(e);
        }
    }
});

//log in to existing account
router.post("/users/login", cors(), async (req, res) => {
    console.log(req.query);
    try {
        const user = await User.findByCredentials(req.query.username, req.query.password);
        // const user = await User.findByCredentials(req.body.username, req.body.password);

        const token = await user.generateAuthToken();
        res.json({
            user: user,
            token: token
        });
    } catch (e) {
        const errorMessage = e.toString();
        console.log(errorMessage);
        if (errorMessage.includes("Too many incorrect attempts")) {
            //too many incorrect login attempts
            res.status(401).send(e);
        } else if (errorMessage.includes("Unable to log in")) {
            //incorrect credentials
            res.status(400).send(e);
        } else {
            //account under lockdown
            res.status(470).send(e);
        }
    }
})

router.post("/users/login/reset", cors(), async (req, res) => {
    console.log(req.query);
    try {

        const user = await User.findByCredentialsResetPass(req.query.username, req.query.rpin);
        // const user = await User.findByCredentials(req.body.username, req.body.password);

        user.password = req.query.rpassword;
        await user.save();
        res.status(200).send();
    } catch (e) {
        const errorMessage = e.toString();
        console.log(errorMessage);
        if (errorMessage.includes("Too many incorrect attempts")) {
            //too many incorrect login attempts
            res.status(401).send(e);
        } else if (errorMessage.includes("Unable to log in")) {
            //incorrect credentials
            res.status(400).send(e);
        } else {
            //account under lockdown
            res.status(470).send(e);
        }
    }
})

router.post("/users/logout", cors(), auth, async (req, res) => {
    try {
        //filter out and remove the token from the session that the user is logging out from
        req.user.tokens = req.user.tokens.filter((token) => {
            //iterate through each token in the user's tokens array
            //if the token being logged out from matches one of the user's current tokens, function returns false and
            //that token is removed from the tokens array. Otherwise, returns true and token is kept in tokens array
            return token.token != req.token;
        });

        //save the user again, with that token removed
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.post("/users/logoutall", cors(), auth, async (req, res) => {
    try {
        //remove all tokens from this user's tokens array by setting it to an empty array
        req.user.tokens = [];

        //save the user again, with all tokens removed
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

//get all users currently in database
router.get("/users", cors(), async (req, res) => {
    try {
        const users = await User.find();
        var users_stripped = []
        for (var i = 0; i < users.length; i++) {
            users_stripped.push({
                username: users[i].username, email: users[i].email,
                activeRecord: users[i].activeRecord, contacts: users[i].contacts
            });
        }
        res.json(users_stripped);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/users/date", cors(), async (req, res) => {
    try {
        const users = await User.find();
        // search a particular user in the user array
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == req.query.username) {
                res.status(200).json(users[i]);
            }
        }
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/deactivate", cors(), async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        user.activeRecord = 1;
        await user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/change", cors(), async (req, res) => {
    try {
        const users = await User.find();
        await User.resetPassword(req.query.username, req.query.cpw, req.query.npw);
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == req.query.username) {
                res.status(200).send();
            }
        }
    } catch (e) {
        const errorMessage = e.toString();
        if (errorMessage.includes("Incorrect corrent password.")) {
            res.status(400).send(e);
        } else if (errorMessage.includes("Password must be at least 8 characters long.")) {
            res.status(401).send(e);
        } else if (errorMessage.includes("Password cannot contain 'password'.")) {
            res.status(402).send(e);
        } else if (errorMessage.includes("Password must contain at least one special character.")) {
            res.status(403).send(e);
        } else {
            res.status(404).send(e);
        }
    }
});

router.post("/users/add", cors(), async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        user.contacts.push(req.query.contact);
        await user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/addRec", cors(), async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        user.contacts.push(req.query.contact);
        await user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/remove", cors(), async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        for (var i = 0; i < user.contacts.length; i++) {
            if (req.query.contact === user.contacts[i]) {
                var temp = user.contacts;
                temp.splice(i, 1);
                user.contacts = temp;
            }
        }
        await user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/users/shuffle", cors(), async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.receiver });
        for (var i = 0; i < user.contacts.length; i++) {
            if (req.query.sender === user.contacts[i]) {
                var final = [];
                var temp = user.contacts;
                temp.splice(i, 1);
                final.push(req.query.sender);
                for (var j = 0; j < temp.length; j++) {
                    final.push(temp[j]);
                }
                user.contacts = final;
            }
        }
        await user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

//get particular user, using dynamically forming URL's
router.get("/users/:id", cors(), async (req, res) => {
    //req.params stores the user that is being requested
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    };

    // User.findById(_id).then((user) => {
    //     //whether or not a matching user is actually found, request will be considered a success
    //     //use conditional logic to account for cases where no matching results are returned
    //     if (!user) {
    //         return res.status(404).send();
    //     }

    //     //status here will be 200
    //     res.send(user);
    // }).catch((e) => {
    //     res.status(500).send();
    // });

});

// router.patch("/users/update/:id", cors(), async (req, res) => {
//     //updates will hold an array of keys (attributes) that the incoming parameter is trying to update
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ["username", "email", "password"];
//     const isValidUpdateOperation = updates.every((update) => {
//         //called once for every item in updates. Every update parameter will be checked against allowedUpdates
//         //every() only returns true if every evaluation is true. One single false will make every() return false
//         return allowedUpdates.includes(update);
//     });
//
//     if (!isValidUpdateOperation) {
//         return res.status(400).send({ error: "Invalid updates." });
//     };
//
//     try {
//         //new: true returns the user AFTER update is applied
//         //runValidators: true ensures validators are run and updates conform to original requirements
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//
//         const user = await User.findById(req.params.id);
//         updates.forEach((update) => {
//             //use bracket notation to select update field dynamically based on what "update" is in the forEach loop
//             //specifies which field(s) in user to update, and to what value
//             user[update] = req.body[update];
//         });
//
//         await user.save();
//
//         if (!user) {
//             return res.status(404).send();
//         }
//
//         res.send(user);
//     } catch (e) {
//         res.status(400).send(e);
//     };
// });

// router.delete("/users/delete/:id", cors(), async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//
//         if (!user) {
//             //user to delete does not exist
//             return res.status(404).send();
//         }
//
//         res.send(user);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

const sendTokenResponse = (token, res) => {
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            token: token.toJwt()
        })
    );
};

router.get('/video/token', (req, res) => {
    const identity = req.query.identity;
    const room = req.query.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);

});
router.post('/video/token', (req, res) => {
    const identity = req.body.identity;
    const room = req.body.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
});


router.post('/videochat', async (req, res) => {
    const callee = req.body.callee;
    const caller = req.body.caller;
    try {
        const user = await User.findOne({ username: callee });
        user.caller = caller;
        await user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/getting_video_chat', async (req, res) => {
    const callee = req.query.callee;
    const user = await User.findOne({ username: callee });
    res.set('Content-Type', 'application/json');
    res.send(
        JSON.stringify({
            caller: user.caller
        })
    );
});

module.exports = router;

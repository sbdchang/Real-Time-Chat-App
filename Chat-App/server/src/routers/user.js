const express = require("express");
const User = require("../models/user");
const cors = require("cors");
const router = new express.Router();


router.post("/users/register", cors(), async (req, res) => {
    //create new user using information parsed from incoming JSON
    // console.log(req.query);
    const user = new User(req.query);

    // await user.save().then((res) => {
    //     return res.status(200).send(user);
    // }).catch((e) => {
        // if (e.code === 11000) {
        //     res.status(460).send(e);
        // } else if (e.errors.email) {
        //     console.log("email");
        //     res.status(461).send(e);
        // } else if (e.errors.password) {
        //     console.log("password");
        //     res.status(462).send(e);
        // } else {
        //     res.status(463).send(e);
        // }
    // })
    
    try {
        await user.save();
        res.status(200).send(user);
    } catch(e) {
        if (e.code === 11000) {
            res.status(460).send(e);
        } else if (e.errors.email) {
            console.log("email");
            res.status(461).send(e);
        } else if (e.errors.password) {
            console.log("password");
            res.status(462).send(e);
        } else {
            res.status(463).send(e);
        }
    }

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     //set status code to the most accurate for this particular error situation. httpstatuses.com for list of all status codes
    //     res.status(400).send(e);
    // });
});

//log in to existing account
router.post("/users/login", cors(), async(req, res) => {
    console.log(req.query);
    try {
        const user = await User.findByCredentials(req.query.username, req.query.password);
        // const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user: user,
            token: token
        });
    } catch (e) {
        res.status(400).send(e);
    }
})

//get all users currently in database
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(e) {
        res.status(500).send();
    }

    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
});

//get particular user, using dynamically forming URL's
router.get("/users/:id", async (req, res) => {
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

router.patch("/users/update/:id", async (req, res) => {
    //updates will hold an array of keys (attributes) that the incoming parameter is trying to update
    const updates = Object.keys(req.body);
    const allowedUpdates = ["username", "email", "password"];
    const isValidUpdateOperation = updates.every((update) => {
        //called once for every item in updates. Every update parameter will be checked against allowedUpdates
        //every() only returns true if every evaluation is true. One single false will make every() return false
        return allowedUpdates.includes(update);
    });

    if (!isValidUpdateOperation) {
        return res.status(400).send({error: "Invalid updates."});
    };

    try {
        //new: true returns the user AFTER update is applied
        //runValidators: true ensures validators are run and updates conform to original requirements
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        const user = await User.findById(req.params.id);
        updates.forEach((update) => {
            //use bracket notation to select update field dynamically based on what "update" is in the forEach loop
            //specifies which field(s) in user to update, and to what value
            user[update] = req.body[update];
        });

        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete("/users/delete/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            //user to delete does not exist
            return res.status(404).send();
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
    //create new task using information parsed from incoming JSON
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch(e) {
        res.status(400).send(e);
    };

    // task.save().then(() => {
    //     res.send(task);
    // }).catch((e) => {
    //     //set status code to the most accurate for this particular error situation. Check httpstatuses.com for list of all status codes
    //     res.status(400).send(e);
    // });
});

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    };

    // Task.find({}).then((task) => {
    //     res.send(task);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
});

router.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send();
    //     }

    //     res.send(task);
    // }).catch((e) => {
    //     res.status(500).send();
    // });
});

router.patch("/tasks/:id", async (req, res) => {
    //updates will hold an array of keys (attributes) that the incoming parameter is trying to update
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
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
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        const task = await Task.findById(req.params.id);
        updates.forEach((update) => {
            //use bracket notation to select update field dynamically based on what "update" is in the forEach loop
            //specifies which field(s) in user to update, and to what value
            task[update] = req.body[update];
        });

        await task.save();

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    };
});

router.delete("/tasks/:id", async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            //task to delete does not exist
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
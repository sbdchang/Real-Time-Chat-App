const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//creates a schema for mongoose object "User" which contains all the attributes defined for a User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true, //each email can only be used to register for an account once
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            //use validator package to validate email, passing in the email stored in variable value
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid.");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isLength(value, {min: 8, max: undefined})) {
                throw new Error("Password must be at least 8 characters long.");
            }

            if (value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password'.");
            }

            const letters = /^[A-Za-z0-9 ]+$/;
            if (letters.test(value)) {
                throw new Error("Password must contain at least one special character.");
            }
        }    
    },
    pin: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isLength(value, {min: 8, max: undefined})) {
                throw new Error("Password must be at least 8 characters long.");
            }

            if (value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password'.");
            }
        }
    },
    tokens: [{
        //array of token objects, each has a token property
        token: {
            type: String,
            required: true
        }
    }],
    incorrectAttempts: {
        type: Number,
        default: 0
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    },
    dateNextAvailLoginAttempt: {
        type: Date,
        default: Date.now
    },
    index: {
        type: Number,
        default: 0
    },
    messages: [{
        usermsg: {
            type: Array,
            default: []
        },
        received: {
            type: Number,
            default: 0
        },
    }],
});

//instance method, accessible on the instance of User created (user)
userSchema.methods.generateAuthToken = async function() {
    const user = this;

    //generate a token for this user using jwt.sign() method
    //first param: use _id of user as data embedded in the token; user._id is object ID, so need to convert to String for jwt
    //second param: tamper-proof secret
    const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

    //concatenate new token to tokens, which is an array of token objects. As such, newly token must be an object, so use {}
    //new token object has one property token - use newly generated token for this property's value
    user.tokens = user.tokens.concat({ token: token });
    
    //call save so the token is saved to the user database
    await user.save();

    return token;
}

userSchema.statics.resetPassword = async(username, cpw, npw) => {
    const user = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(cpw, user.password);
    if (!isMatch) {
        throw new Error("Incorrect corrent password.");
    }
    // if (!validator.isLength(npw, {min: 8, max: undefined})) {
    //     throw new Error("Password must be at least 8 characters long.");
    // }
    // if (npw.toLowerCase().includes("password")) {
    //     throw new Error("Password cannot contain 'password'.");
    // }
    // const letters = /^[A-Za-z0-9 ]+$/;
    // if (letters.test(npw)) {
    //     throw new Error("Password must contain at least one special character.");
    // }
    await User.update({username: username}, {$set: {password: await bcrypt.hash(npw, 8)}});
    return "Password Changed";
}

userSchema.statics.updateMessage = async function(s, r, m, t) {
    const sender = await User.findOne({username: s});
    const receiver = await User.findOne({username: r});
    const sidx = sender.index;
    const ridx = receiver.index;
    if (sidx < ridx) {
        if (t === "text") {
            sender.messages[ridx-1].usermsg.push({key: m, value: "Text Sent: "});
            receiver.messages[sidx].usermsg.push({key: m, value: "Text Received: "});
        } else if (t === "image") {
            sender.messages[ridx-1].usermsg.push({key: m, value: "Image Sent: "});
            receiver.messages[sidx].usermsg.push({key: m, value: "Image Received: "});
        } else if (t === "audio") {
            sender.messages[ridx-1].usermsg.push({key: m, value: "Audio Sent: "});
            receiver.messages[sidx].usermsg.push({key: m, value: "Audio Received: "});
        } else if (t === "video") {
            sender.messages[ridx-1].usermsg.push({key: m, value: "Video Sent: "});
            receiver.messages[sidx].usermsg.push({key: m, value: "Video Received: "});
        }
        receiver.messages[sidx].received = receiver.messages[sidx].received + 1;
    } else {
        if (t === "text") {
            sender.messages[ridx].usermsg.push({key: m, value: "Text Sent: "});
            receiver.messages[sidx-1].usermsg.push({key: m, value: "Text Received: "});
        } else if (t === "image") {
            sender.messages[ridx].usermsg.push({key: m, value: "Image Sent: "});
            receiver.messages[sidx-1].usermsg.push({key: m, value: "Image Received: "});
        } else if (t === "audio") {
            sender.messages[ridx].usermsg.push({key: m, value: "Audio Sent: "});
            receiver.messages[sidx-1].usermsg.push({key: m, value: "Audio Received: "});
        } else if (t === "video") {
            sender.messages[ridx].usermsg.push({key: m, value: "Video Sent: "});
            receiver.messages[sidx-1].usermsg.push({key: m, value: "Video Received: "});
        }
        receiver.messages[sidx-1].received = receiver.messages[sidx-1].received + 1;
    }
    await sender.save();
    await receiver.save();
}

userSchema.statics.clearMessage = async function(s, r) {
    const sender = await User.findOne({username: s});
    const receiver = await User.findOne({username: r});
    const sidx = sender.index;
    const ridx = receiver.index;
    if (sidx < ridx) {
        receiver.messages[sidx].received = 0;
    } else {
        receiver.messages[sidx-1].received = 0;
    }
    await receiver.save();
}

userSchema.methods.initMessage = async function() {
    const user = this;
    const users = await User.find();
    user.index = users.length;
    for (var i = 0; i < users.length; i++) {
        const tempUser = await User.findOne({index: i });
        tempUser.messages = tempUser.messages.concat({usermsg: []});
        tempUser.save();
        user.messages = user.messages.concat({usermsg: []});
    }
}

userSchema.statics.findByCredentials = async(username, password) => {
    const user = await User.findOne({ username: username });
    const currentTime = new Date();
    if (currentTime.getTime() < user.dateNextAvailLoginAttempt) {
        const waitTime = Math.round((user.dateNextAvailLoginAttempt.getTime() - currentTime.getTime()) / 60000);
        throw new Error("Acount under lockdown. Please try again in " + waitTime + " minute(s).");
    }

    if (!user) {
        throw new Error("Unable to log in.");
    }

    if (user.incorrectAttempts >= 3) {
        user.incorrectAttempts = 2;
        
        const afterLockout = new Date(currentTime.getTime() + 3*60000);
        user.dateNextAvailLoginAttempt = afterLockout;
        await user.save();
        throw new Error("Too many incorrect attempts. Account locked down for XXX.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        // console.log(user.incorrectAttempts);
        
        user.incorrectAttempts = user.incorrectAttempts + 1;
        await user.save();
        throw new Error("Unable to log in.");
    }

    user.incorrectAttempts = 0;
    user.dateNextAvailLoginAttempt = Date.now();
    await user.save();
    return user;
}

userSchema.statics.findByCredentialsResetPass = async(username, pin) => {
    const user = await User.findOne({ username: username });
    const currentTime = new Date();
    if (currentTime.getTime() < user.dateNextAvailLoginAttempt) {
        const waitTime = Math.round((user.dateNextAvailLoginAttempt.getTime() - currentTime.getTime()) / 60000);
        throw new Error("Acount under lockdown. Please try again in " + waitTime + " minute(s).");
    }

    if (!user) {
        throw new Error("Unable to log in.");
    }

    if (user.incorrectAttempts >= 3) {
        user.incorrectAttempts = 2;
        
        const afterLockout = new Date(currentTime.getTime() + 3*60000);
        user.dateNextAvailLoginAttempt = afterLockout;
        await user.save();
        throw new Error("Too many incorrect attempts. Account locked down for XXX.");
    }

    const isMatch = await bcrypt.compare(pin, user.pin);

    if (!isMatch) {
        // console.log(user.incorrectAttempts);
        
        user.incorrectAttempts = user.incorrectAttempts + 1;
        await user.save();
        throw new Error("Unable to log in.");
    }

    user.incorrectAttempts = 0;
    user.dateNextAvailLoginAttempt = Date.now();
    await user.save();
    return user;
}

//allows pre-processing of document, in this case the user. Takes advantage of middleware
//hash plain text password before saving
userSchema.pre("save", async function (next) {
    //this keyword references the document, in this case the user, that is about to be saved
    const user = this;

    //check if modification is being made. Parameter takes in the name of the field to check for modifications
    if (user.isModified("password")) {
        //updates the user's password if the password is changed
        user.password = await bcrypt.hash(user.password, 8)
    }

    if (user.isModified("pin")) {
        user.pin = await bcrypt.hash(user.pin, 8);
    }
    next();
})

//pass previously defined schema to the model creation function
const User = mongoose.model("User", userSchema);

module.exports = User;
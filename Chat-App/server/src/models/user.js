const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    }
});

userSchema.statics.findByCredentials = async(username, password) => {
    const user = await User.findOne({ username: username });

    if (!user) {
        throw new Error("Unable to log in.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to log in.");
    }

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

    next();
})

//pass previously defined schema to the model creation function
const User = mongoose.model("User", userSchema);

module.exports = User;
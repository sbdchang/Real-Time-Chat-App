const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async(req, res, next) => {
    try {
        //get the json web token. Grab it from the header and replace the leading "Bearer "
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "thisismynewcourse");
        //looks for a user with the correct ID and the provided token as one of its valid tokens in its tokens array
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if (!user) {
            //if no such user is found, throw an error to run the catch block and not proceed with the authentication process
            throw new Error();
        }

        //Gives route handler access to this user because it's already fetched by adding a new property to req and giving 
        //it the user fetched. Also letting it hold the token used to authenticate this user
        req.user = user;
        req.token = token;
        next();  //ensures the route handler runs because user is authenticated
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
}

module.exports = auth;
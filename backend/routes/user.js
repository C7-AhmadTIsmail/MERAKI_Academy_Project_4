const express = require("express");

const userRouter = express.Router();


const { signUp , registration , deleteUser } = require('../controllers/user');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

userRouter.post("/", signUp );

userRouter.get("/", registration );

userRouter.delete("/",authentication,authorization("delete"),deleteUser );

// About page route.
// userRouter.get("*", function (req, res) {
// res.send("About this wiki");
// });

module.exports = userRouter;
const express = require("express");

const userRouter = express.Router();


const { signUp , registration , deleteUser } = require('../controllers/user');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

userRouter.post("/signUp", signUp );

userRouter.get("/registration", registration );

userRouter.delete("/deleteUser",authentication,authorization("delete"),deleteUser );


// Undefiend end point

// userRouter("*", function (req, res) {
// res.send("About this wiki");
// });

module.exports = userRouter;
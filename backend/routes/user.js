const express = require("express");

const userRouter = express.Router();


const { signUp , registration , deleteUser } = require('../controllers/user');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

userRouter.post("/signUp", signUp );

userRouter.get("/registration", registration );

userRouter.delete("/deleteUser",authentication,authorization("delete"),deleteUser );




module.exports = userRouter;
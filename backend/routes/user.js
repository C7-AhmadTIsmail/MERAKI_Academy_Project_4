const express = require("express");

const userRouter = express.Router();


const { signUp , logIn , getAll , deleteUser } = require('../controllers/user');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

userRouter.post("/signUp", signUp );

userRouter.get("/logIn", logIn );

userRouter.get("/getAll", getAll );

userRouter.delete("/deleteUser",deleteUser );




module.exports = userRouter;
const express = require("express");

const userRouter = express.Router();


const { signUp , getAll , logIn , deleteUser } = require('../controllers/user');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

userRouter.post("/signUp", signUp );


userRouter.get("/getAll", getAll );



userRouter.get("/logIn", logIn );



userRouter.delete("/deleteUser",deleteUser );




module.exports = userRouter;
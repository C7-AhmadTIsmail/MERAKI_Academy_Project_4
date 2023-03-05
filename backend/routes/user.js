const express = require("express");

const userRouter = express.Router();


const { signUp , logIn , getAll , deleteUser , updateUserById , updateUserByEmail } = require('../controllers/user');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

userRouter.post("/signUp", signUp );

userRouter.get("/logIn", logIn );

userRouter.get("/getAll", getAll );

userRouter.delete("/delete/:id",deleteUser );

userRouter.put("/update/:id",updateUserById );

userRouter.put("/update/:email",updateUserByEmail );

module.exports = userRouter;
const express = require("express");

const userRouter = express.Router();


const { signUp , logIn , getAll , deleteUser , updateUserById , updateUserByEmail , getUserDataById } = require('../controllers/user');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

userRouter.post("/signUp", signUp );

userRouter.post("/logIn", logIn );

userRouter.get("/getAll",authentication, getAll );

userRouter.delete("/delete/:id",authentication, deleteUser );

userRouter.put("/update",authentication ,updateUserByEmail );

userRouter.put("/update/:id",authentication , updateUserById );

userRouter.get("/getUserData/:id",authentication , getUserDataById );


module.exports = userRouter;
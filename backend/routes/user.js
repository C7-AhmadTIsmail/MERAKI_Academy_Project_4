const express = require("express");

const userRouter = express.Router();


const { signUp , registration} = require('../controllers/user');

// Home page route.
userRouter.post("/", signUp );

userRouter.get("/", registration );

// About page route.
userRouter.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = userRouter;
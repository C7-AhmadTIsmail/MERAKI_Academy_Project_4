const express = require("express");

const userRouter = express.Router();


const {siginin} = require('../controllers/user');

// Home page route.
userRouter.get("/", siginin );

// About page route.
userRouter.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = userRouter;
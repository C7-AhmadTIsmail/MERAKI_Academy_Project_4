const express = require("express");

const roleRouter = express.Router();


const {addrole,remoiverole} = require('../controllers/role');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

roleRouter.post("/role", addrole );

roleRouter.get("/delete", remoiverole );



// Undefiend end point

// userRouter("*", function (req, res) {
// res.send("About this wiki");
// });

module.exports = roleRouter;
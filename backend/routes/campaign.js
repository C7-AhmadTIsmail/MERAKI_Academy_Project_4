const express = require("express");

const capaginRouter = express.Router();


const { addRole , getAllRole  , updateRole  , removeRole } = require('../controllers/role');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

campaignRouter.post("/add", addRole );

campaignRouter.get("/get", getAllRole );

campaignRouter.put("/update/:id", updateRole );


campaignRouter.delete("/delete/:id", removeRole );



module.exports = capaginRouter;
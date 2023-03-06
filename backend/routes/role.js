const express = require("express");

const roleRouter = express.Router();


const { addRole , getAllRole  , updateRole  , removeRole } = require('../controllers/role');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

roleRouter.post("/add",authentication , addRole );

roleRouter.get("/get",authentication , getAllRole );

roleRouter.put("/update/:id",authentication , updateRole );

roleRouter.delete("/delete/:id",authentication , removeRole );



module.exports = roleRouter;
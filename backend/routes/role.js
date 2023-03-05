const express = require("express");

const roleRouter = express.Router();


const { addRole , getAllRole  , updateRole  , removeRole } = require('../controllers/role');

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

roleRouter.post("/add", addRole );

roleRouter.get("/get", getAllRole );

roleRouter.put("/update/:id", updateRole );


roleRouter.delete("/delete/:id", removeRole );



module.exports = roleRouter;
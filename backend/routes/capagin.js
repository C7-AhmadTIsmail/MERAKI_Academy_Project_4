const express = require("express");

const capaginRouter = express.Router();


const { addCapagin , getAllCapagin , 
    updateCapagin , removeCapagin , getCapaginbyOriginter} = require('../controllers/capagin')


const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

capaginRouter.post("/add/:id", addCapagin );

capaginRouter.get("/get", getAllCapagin );

capaginRouter.put("/update/:id", updateCapagin);

capaginRouter.delete("/delete/:id", removeCapagin );

capaginRouter.get("/getCapagin/:id", getCapaginbyOriginter );

module.exports = capaginRouter;
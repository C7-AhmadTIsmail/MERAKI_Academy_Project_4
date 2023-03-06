const express = require("express");

const contributionRouter = express.Router();


const { addcontribution , getAllcontribution , updatecontribution , removecontribution , getcontributionByUser , getcontributionByCapagin } = require('../controllers/contribution')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

contributionRouter.post("/add/:idCapagin/:idcontributor", addcontribution );

contributionRouter.get("/get", getAllcontribution );

contributionRouter.put("/update/:id", updatecontribution);

contributionRouter.delete("/delete/:id", removecontribution );

contributionRouter.get("/getcontributionUser/:idUser", getcontributionByUser );

contributionRouter.get("/getcontributionCapagin/:idCapagin", getcontributionByCapagin );

module.exports = contributionRouter;



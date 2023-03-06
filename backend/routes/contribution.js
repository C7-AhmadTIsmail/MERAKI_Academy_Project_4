const express = require("express");

const contributionRouter = express.Router();


const { addcontribution , getAllcontribution , updatecontribution ,
     removecontribution , getcontributionByUser , getcontributionByCampaign } = require('../controllers/contribution')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

contributionRouter.post("/add/:idCampaign/:idcontributor", addcontribution );

contributionRouter.get("/get", getAllcontribution );

contributionRouter.put("/update/:id", updatecontribution);

contributionRouter.delete("/delete/:id", removecontribution );

contributionRouter.get("/getcontributionUser/:idUser", getcontributionByUser );

contributionRouter.get("/getcontributionCampaign/:idCampaign", getcontributionByCampaign );

module.exports = contributionRouter;



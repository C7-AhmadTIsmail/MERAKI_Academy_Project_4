const express = require("express");

const contributionRouter = express.Router();


const { addcontribution , getAllcontribution , updatecontribution ,
     removecontribution , getcontributionByUser , getcontributionByCampaign 
     ,getcontributionByCampaignMaximum} = require('../controllers/contribution')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

contributionRouter.post("/add/:idCampaign/:idcontributor",authentication, addcontribution );

contributionRouter.get("/get",authentication, getAllcontribution );

contributionRouter.put("/update/:id",authentication, updatecontribution);

contributionRouter.delete("/delete/:id",authentication, removecontribution );

contributionRouter.get("/getcontributionUser/:idUser",authentication, getcontributionByUser );

contributionRouter.get("/getcontributionCampaign/:idCampaign",getcontributionByCampaign );


contributionRouter.get("/getcontributionCampaignMaximum/:idCampaign",getcontributionByCampaignMaximum );

module.exports = contributionRouter;



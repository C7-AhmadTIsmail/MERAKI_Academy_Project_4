const express = require("express");

const contributionRouter = express.Router();


const { addContribution , getAllContribution , updateContribution ,
     removeContribution , getContributionByUser , getContributionByCampaign 
     ,getContributionByCampaignMaximum} = require('../controllers/contribution')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

contributionRouter.post("/add/:idCampaign/:idContributor",authentication, addContribution );

contributionRouter.get("/get", getAllContribution );

contributionRouter.put("/update/:id",authentication, updateContribution);

contributionRouter.delete("/delete/:id",authentication, removeContribution );

contributionRouter.get("/getContributionUser/:idUser",authentication, getContributionByUser );

contributionRouter.get("/getContributionCampaign/:idCampaign",getContributionByCampaign );


contributionRouter.get("/getContributionCampaignMaximum/:idCampaign",getContributionByCampaignMaximum );

module.exports = contributionRouter;



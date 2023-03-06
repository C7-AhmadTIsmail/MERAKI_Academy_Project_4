const express = require("express");

const campaignRouter = express.Router();


const { addCampaign , getAllCampaign , 
    updateCampaign , removeCampaign , getCampaignByOriginter} = require('../controllers/campaign')


const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

campaignRouter.post("/add/:id", addCampaign );

campaignRouter.get("/get", getAllCampaign );

campaignRouter.put("/update/:id", updateCampaign);

campaignRouter.delete("/delete/:id", removeCampaign );

campaignRouter.get("/getCampaign/:id", getCampaignByOriginter );

module.exports = campaignRouter;
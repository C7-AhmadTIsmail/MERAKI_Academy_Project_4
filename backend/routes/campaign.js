const express = require("express");

const campaignRouter = express.Router();


const { addCampaign , getAllCampaign , 
    updateCampaign , removeCampaign , getCampaignByOriginates} = require('../controllers/campaign')


const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

campaignRouter.post("/add/:id",authentication, addCampaign );

campaignRouter.get("/get", getAllCampaign );

campaignRouter.put("/update/:id",authentication, updateCampaign);

campaignRouter.delete("/delete/:id",authentication, removeCampaign );

campaignRouter.get("/getCampaign/:id",authentication, getCampaignByOriginates );

module.exports = campaignRouter;
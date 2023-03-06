const express = require("express");

const campaignRouter = express.Router();


const { addCampaign , getAllCampaign , 
    updateCampaign , removeCampaign , getCampaignByOriginter} = require('../controllers/campaign')


const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

campaignRouter.post("/add/:id",authentication, addCampaign );

campaignRouter.get("/get", getAllCampaign );

campaignRouter.put("/update/:id",authentication, updateCampaign);

campaignRouter.delete("/delete/:id",authentication, removeCampaign );

campaignRouter.get("/getCampaign/:id",authentication, getCampaignByOriginter );

module.exports = campaignRouter;
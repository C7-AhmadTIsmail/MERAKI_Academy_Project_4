const express = require("express");

const campaignTeamsRouter = express.Router();


const { addteamsMamber , removeteamsMamber , getAllteamsMamberForThisCampaign  } = require('../controllers/campaignTeams')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

campaignTeamsRouter.post("/add/:idCampaign",authentication , addteamsMamber );

campaignTeamsRouter.delete("/delete/:idCampaign",authentication , removeteamsMamber );

campaignTeamsRouter.get("/:idCampaign", getAllteamsMamberForThisCampaign );


module.exports = campaignTeamsRouter;



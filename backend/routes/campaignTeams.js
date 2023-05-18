const express = require("express");

const campaignTeamsRouter = express.Router();


const { addTeamsMember , removeTeamsMember , getAllTeamsMemberForThisCampaign  } = require('../controllers/campaignTeams')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

campaignTeamsRouter.post("/add/:idCampaign",authentication , addTeamsMember );

campaignTeamsRouter.put("/delete/:idCampaign",authentication , removeTeamsMember );

campaignTeamsRouter.get("/:idCampaign", getAllTeamsMemberForThisCampaign );


module.exports = campaignTeamsRouter;



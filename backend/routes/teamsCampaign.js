const express = require("express");

const campaignTeamsRouter = express.Router();


const { addteamsMamber , removeteamsMamber , getAllteamsMamberForThisCampaign  } = require('../controllers/favorite')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

campaignTeamsRouter.post("/add/:idCampaign/:idUser", addteamsMamber );

campaignTeamsRouter.delete("/delete/:idUser", removeteamsMamber );

campaignTeamsRouter.get("/:idUser", getAllteamsMamberForThisCampaign );


module.exports = campaignTeamsRouter;



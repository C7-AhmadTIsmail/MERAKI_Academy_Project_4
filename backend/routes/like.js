const express = require("express");

const likeRouter = express.Router();


const { addLike , getAllLike  , removeLike , getLikeByUser ,getLikeByCampaign } = require('../controllers/like')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

likeRouter.post("/add/:idCampaign/:idUser", authentication , addLike );

likeRouter.get("/get", authentication , getAllLike );

likeRouter.delete("/delete/:idCampaign/:idUser", authentication , removeLike );

likeRouter.get("/getLikeUser/:idUser" , getLikeByUser );

likeRouter.get("/getLikeCampaign/:idCampaign" , getLikeByCampaign );

module.exports = likeRouter;

const express = require("express");

const favoriteRouter = express.Router();


const { addfavorite , removefavorite , getfavoriteByUser  } = require('../controllers/favorite')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

favoriteRouter.post("/add/:idCampaign/:idUser", addfavorite );

favoriteRouter.delete("/delete/:idUser", removefavorite );

favoriteRouter.get("/:idUser", getfavoriteByUser );


module.exports = favoriteRouter;


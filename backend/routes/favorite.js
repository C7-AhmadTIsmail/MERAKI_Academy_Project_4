const express = require("express");

const favoriteRouter = express.Router();


const { addFavorite , removeFavorite , getFavoriteByUser  } = require('../controllers/favorite')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

favoriteRouter.post("/add/:idCampaign/:idUser",authentication, addFavorite );

favoriteRouter.delete("/delete/:idCampaign/:idUser",authentication, removeFavorite );

favoriteRouter.get("/:idUser",authentication, getFavoriteByUser );


module.exports = favoriteRouter;



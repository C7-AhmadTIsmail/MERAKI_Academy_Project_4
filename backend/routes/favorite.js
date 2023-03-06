const express = require("express");

const favoriteRouter = express.Router();


const { addfavorite , removefavorite , getfavoriteByUser  } = require('../controllers/favorite')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

favoriteRouter.post("/add/:idCampaign/:idUser",authentication, addfavorite );

favoriteRouter.delete("/delete/:idUser",authentication, removefavorite );

favoriteRouter.get("/:idUser",authentication, getfavoriteByUser );


module.exports = favoriteRouter;



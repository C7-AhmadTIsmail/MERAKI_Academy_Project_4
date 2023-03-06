const express = require("express");

const favoriteRouter = express.Router();


const { addfavorite , removefavorite , getfavoriteByUser  } = require('../controllers/favorite')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

favoriteRouter.post("/add/:idCapagin/:idcontributor", addfavorite );

favoriteRouter.delete("/delete/:id", removefavorite );

favoriteRouter.get("/:idUser", getfavoriteByUser );


module.exports = favoriteRouter;



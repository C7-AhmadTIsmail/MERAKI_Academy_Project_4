const express = require("express");

const commentRouter = express.Router();


const { addComment , getAllComment , updateComment , removeComment , getCommentByUser , getCommentByCampaign } = require('../controllers/comment')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

commentRouter.post("/add/:idCampaign/:idCommenter", addComment );

commentRouter.get("/get", getAllComment );

commentRouter.put("/update/:id", updateComment);

commentRouter.delete("/delete/:id", removeComment );

commentRouter.get("/getCommentUser/:idUser", getCommentByUser );

commentRouter.get("/getCommentCampaign/:idCampaign", getCommentByCampaign );

module.exports = commentRouter;
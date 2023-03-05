const express = require("express");

const commentRouter = express.Router();


const { addcomment , getAllcomment , updatecomment , removecomment , getcommentbyOriginter  } = require('../controllers/comment')

const { authentication } = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');

//end point

commentRouter.post("/add/:idcampaign/:idcommenter", addcomment );

commentRouter.get("/get", getAllcomment );

// commentRouter.put("/update/:id", updatecomment);

// commentRouter.delete("/delete/:id", removecomment );

// commentRouter.get("/getCapagin/:id", getcommentbyOriginter );

module.exports = commentRouter;

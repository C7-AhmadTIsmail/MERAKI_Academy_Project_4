
const commentSchema = require("../models/commentSchema");



const addComment = (req, res) => {

    const campaign = req.params.idCampaign;
    const commenter = req.params.idCommenter;
    const { comment } = req.body

    const newCampaign = new commentSchema({ comment, commenter, campaign })

    newCampaign.save().then((result) => {
        res.status(201).json(
            {
                success: true,
                message: "Success comment created",
                Comment: result
            })
    })
        .catch((err) => {
            res.status(400).json(
                {
                    success: false,
                    message: err
                })
        });
}


const getAllComment = (req, res) => {
    commentSchema.find({}).populate(["commenter", "campaign"])
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success All comment update",
                    Comment: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const updateComment = (req, res) => {
    id_ = req.params.id
    const { comment } = req.body

    commentSchema.findByIdAndUpdate(id_, { comment })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success comment update",
                    Comment: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const removeComment = (req, res) => {
    id_ = req.params.id

    commentSchema.findByIdAndDelete(id_)
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success comment remove",
                    Comment: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const getCommentByUser = (req, res) => {
    id_ = req.params.idUser
    commentSchema.find({ commenter: id_ })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success all Comment for this user",
                    Comment: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}

const getCommentByCampaign = (req, res) => {
    id_ = req.params.idCampaign
    commentSchema.find({ campaign: id_ })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success all Comment for this campaign",
                    Comment: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}




module.exports = { addComment, getAllComment, updateComment, removeComment, getCommentByUser, getCommentByCampaign };
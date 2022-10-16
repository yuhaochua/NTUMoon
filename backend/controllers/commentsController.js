const Comments = require('../models/commentsModel')

//get all courses
const getAllComments = async (req, res) => { //take in courseCode from req.body
    const {courseCode} = req.body
    const comments = await Comments.find({courseCode}).sort({createdAt: -1})
    res.status(200).json(comments) //send back (response) as json
}

const addComment = async(req, res) => { 
    try {
        const {courseCode, username, comments} = req.body
        const {_id} = req.user
        
        const commentDetail = {user_id: _id, username:username, comments: comments}
        console.log(commentDetail)
        let commentDb
        
        const existsCourse = await Comments.findOne({ courseCode: courseCode })
        if (existsCourse) {
            commentDb = await Comments.findOneAndUpdate({courseCode: courseCode}, {$push: { commentDetails: commentDetail}}, {new: true})
            console.log("one commentAdded", commentDb)
        }
        else {
            commentDb = await Comments.create({courseCode: courseCode, commentDetails: commentDetail}) //might need to add empty array for reviews?
            console.log("commentsAdded", commentDb)
        }
        
        res.status(200).json(commentDb)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * hello i love javadoc
 */
const deleteComment = async(req, res) => { //delete based in object id (created in mongodb)
    try {
        const {courseCode, _id} = req.body

        const existsComment = await Comments.findOne({ courseCode: courseCode, "commentDetails._id": _id })
        if (!existsComment) {
            throw Error('no such comment')
        }

        const deletedComment = await Comments.findOneAndUpdate({courseCode: courseCode}, {$pull: { commentDetails: {_id : _id}}}, {new: true})
        
        console.log(deletedComment)
        res.status(200).json(deletedComment)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const editComment = async(req, res) => { //we need to get object_id of comment
    try {
        const {courseCode, _id, comments} = req.body

        const existsComment = await Comments.findOne({ courseCode: courseCode, "commentDetails._id": _id })
        if (!existsComment) {
            throw Error('no such comment')
        }

        const editedComment = await Comments.findOneAndUpdate({courseCode: courseCode, "commentDetails._id": _id}, {$set: { "commentDetails.$.comments": comments}}, {new: true})
        
        console.log(editedComment)
        res.status(200).json(editedComment)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}

const addReview = async(req, res) => { 
    try {
        const {courseCode, review} = req.body
        const {_id} = req.user
        
        const reviewDetail = {user_id: _id, review: review}
        console.log(reviewDetail)
        let commentDb
        
        const existsCourse = await Comments.findOne({ courseCode: courseCode })
        if (existsCourse) {
            const existsReview = await Comments.findOne({ courseCode: courseCode, "reviews.user_id": _id})
            if (!existsReview) {
                commentDb = await Comments.findOneAndUpdate({courseCode: courseCode}, {$push: { reviews: reviewDetail}}, {new: true})
            } else {
                throw Error("Review Already Added")
            }
        }
        else {
            commentDb = await Comments.create({courseCode: courseCode, reviews: reviewDetail})
            console.log("review added", commentDb)
        }
        
        res.status(200).json(commentDb)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteReview = async(req, res) => { 
    try {
        const {courseCode, _id} = req.body

        const existsReview = await Comments.findOne({ courseCode: courseCode, "reviews._id": _id })
        if (!existsReview) {
            throw Error('no such review')
        }

        const deletedReview = await Comments.findOneAndUpdate({courseCode: courseCode}, {$pull: { reviews: {_id : _id}}}, {new: true})
        
        console.log(deletedReview)
        res.status(200).json(deletedReview)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const editReview = async(req, res) => { 
    try {
        //delete review
        const {courseCode, _id, review} = req.body
        const {user_id} = req.user

        const existsReview = await Comments.findOne({ courseCode: courseCode, "reviews._id": _id })
        if (!existsReview) {
            throw Error('no such review')
        }

        const deletedReview = await Comments.findOneAndUpdate({courseCode: courseCode}, {$pull: { reviews: {_id : _id}}})
        
        //add review
        const reviewDetail = {user_id: user_id, review: review}
        console.log(reviewDetail)
        let commentDb

        const existsCourse = await Comments.findOne({ courseCode: courseCode })
        if (existsCourse) {
            const existsReview = await Comments.findOne({ courseCode: courseCode, "reviews.user_id": user_id})
            if (!existsReview) {
                commentDb = await Comments.findOneAndUpdate({courseCode: courseCode}, {$push: { reviews: reviewDetail}})
            } else {
                throw Error("Review Already Added")
            }
        }
        else {
            commentDb = await Comments.create({courseCode: courseCode, reviews: reviewDetail})
            console.log("review added", commentDb)
        }

        console.log(commentDb)
        res.status(200).json(commentDb)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllComments,
    addComment,
    deleteComment,
    editComment,
    addReview,
    deleteReview,
    editReview
}
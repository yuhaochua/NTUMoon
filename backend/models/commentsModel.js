const mongoose = require('mongoose')

const Schema = mongoose.Schema


const detailsSchema = new Schema({
    user_id: { //will get this from the jwt payload after verifying token
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
}, {timestamps: true})


const commentsSchema = new Schema({ //whenever a user comments, we need to first find the course code in the database, and then append the user to the array of comment details(if user already exists justr add to the comments array)
    courseCode: {
        type: String,
        required: true
    },
    commentDetails: [detailsSchema] //array of users leaving comments

})



module.exports = mongoose.model('Comments', commentsSchema)
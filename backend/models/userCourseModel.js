const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const detailsSchema = new Schema({
//     type: { //lab, lecture, tutorial
//         type: String,
//         required: true
//     },
//     timeStart: { //time it starts
//         type: String,
//         required: true
//     },
//     timeEnd: {
//         type: String,
//         required: true
//     },
//     day: {
//         type: String,
//         required: true
//     },
//     venue: {
//         type: String,
//         required: true
//     }
// })

// const courseSchema = new Schema({
//     courseCode: {
//         type: String,
//         required: true
//     },
//     courseTitle: {
//         type: String,
//         required: true
//     },
//     prerequisites: {
//         type: Array,
//         required: true
//     },
//     au: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     index: {
//         type: Number,
//         required: true
//     },
//     details: [detailsSchema]
// })

const course = new Schema({
    courseCode: {
        type: String,
        required: true,
    },
    index: {
        type: String,
        required: true
    }
})

const userCourseSchema = new Schema({
    user_id: { //will be from req.user
        type: String,
        required: true,
    },
    courses: [course]
})

module.exports = mongoose.model('UserCourse', userCourseSchema)
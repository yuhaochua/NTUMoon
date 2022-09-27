const mongoose = require('mongoose')

const Schema = mongoose.Schema

const detailsSchema = new Schema({
    type: { //lab, lecture, tutorial
        type: String,
        required: true
    },
    timeStart: { //time it starts
        type: String,
        required: true
    },
    timeEnd: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    }
})

const indexSchema = new Schema({
    index: {
        type: Number,
        required: true
    },
    details: [detailsSchema]
})

const courseSchema = new Schema({
    courseCode: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    prerequisites: {
        type: Array,
        required: true
    },
    au: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    indexes: [indexSchema]
})

module.exports = mongoose.model('Course', courseSchema)
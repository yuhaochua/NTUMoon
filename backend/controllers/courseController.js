const Workout = require('../models/courseModel')
const mongoose = require('mongoose')

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Workout.find()
    // .sort({createdAt: -1})
    res.status(200).json(courses) //send back (response) as json
}

//create new course
const createCourse =  async (req, res) => {
    console.log(req.body)

    try {
        const workout = await Workout.create(req.body) 
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}





module.exports = {
    getAllCourses,
    createCourse
}
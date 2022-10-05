const Course = require('../models/courseModel')
const UserCourse = require('../models/userCourseModel')
const mongoose = require('mongoose')

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    // .sort({createdAt: -1})
    res.status(200).json(courses) //send back (response) as json
}

//create new course
const createCourse =  async (req, res) => {
    try {
        console.log(req.body)
        const course = await Course.create(req.body) //will change this later on...
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//add course for user
const addCourse = async(req, res) => {
    try {
        console.log("enter add course")
        console.log(req.user._id)
        const course = await UserCourse.create(req.body) //change this later on...
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}





module.exports = {
    getAllCourses,
    createCourse,
    addCourse,
}
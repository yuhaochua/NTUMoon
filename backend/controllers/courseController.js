const Course = require('../models/courseModel')
const UserCourse = require('../models/userCourseModel')
const mongoose = require('mongoose')

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    // .sort({createdAt: -1})
    res.status(200).json(courses) //send back (response) as json
}

//add course for user (takes in courseCode and index from req.body), when calling api from react need to include authorisation...
const addCourse = async(req, res) => { 
    try {
        const {courseCode, index} = req.body
        const {_id} = req.user
        const existsCourseCode = await UserCourse.findOne({ user_id: _id, "courses.courseCode": courseCode })
        if (existsCourseCode) {
            throw Error('Course already added')
        }
        const existsAddedCourse = await UserCourse.findOne({user_id:_id})
        const course = {courseCode: courseCode, index: index}
        console.log(course)
        let courseAdded
        if (existsAddedCourse) {
            courseAdded = await UserCourse.findOneAndUpdate({user_id: _id}, {$push: { courses: course}})
        }
        else {
            courseAdded = await UserCourse.create({user_id: _id, courses: course})
            console.log("courseadded", courseAdded)
        }
        
        res.status(200).json(courseAdded)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * hello
 */
//delete course for user (takes in courseCode, index)
const deleteCourse = async(req, res) => {
    try {
        const{courseCode, index} = req.body
        const course = {courseCode: courseCode, index: index}
        const {_id} = req.user
        const existsCourseCode = await UserCourse.findOne({ user_id: _id, "courses.courseCode": courseCode })
        if (!existsCourseCode) {
            throw Error('no such course')
        }
        const deleted = await UserCourse.findOneAndUpdate({user_id: _id}, {$pull: { courses: course}})
        console.log(deleted)
        res.status(200).json(deleted)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    getAllCourses,
    addCourse,
    deleteCourse
}
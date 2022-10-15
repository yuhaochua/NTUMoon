const Course = require('../models/courseModel')
const UserCourse = require('../models/userCourseModel')
const mongoose = require('mongoose')

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    // .sort({createdAt: -1})
    res.status(200).json(courses) //send back (response) as json
}

//get all courses for a specific user
const getUserCourses = async (req, res) => {
    try {
        const {_id} = req.user
        let listUserCourses = await UserCourse.findOne({user_id: _id})
        if (!listUserCourses) {
            throw Error ("No Courses Added")
        }
        var listUserCourseInfo = [];
        // listUserCourses.courses is [{courseCode,index},{},{}]
        for (i=0; i<(listUserCourses.courses).length; i++) { // userCourse = {courseCode, index}
            try{
                const {courseCode, index} = listUserCourses.courses[i]
                const course = await Course.findOne({courseCode: courseCode})
                let courseDetails = course.indexes.find(data => data.index == index).details
                var userCourseInfo = {
                    courseCode: courseCode,
                    courseTitle: course.courseTitle,
                    prerequisites: course.prerequisites,
                    au: course.au,
                    description: course.description,
                    index: index,
                    details: courseDetails
                }

                // add to listUserCourseInfo
                listUserCourseInfo.push(userCourseInfo)
            }
            catch(error) {
                res.status(400).json({error: error.message})
            }
        }
        res.status(200).json(listUserCourseInfo) //send back (response) as json
    } catch(error) {
        res.status(400).json({error: error.message})
    }
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
    getUserCourses,
    addCourse,
    deleteCourse
}
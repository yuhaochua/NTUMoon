const express = require('express')

const router = express.Router()
const {
    createCourse,
    getAllCourses,
} = require('../controllers/courseController')

//GET all courses
router.get('/', getAllCourses)

//POST a new course (add course for us not users, will create one for users to add later on)
router.post('/', createCourse)


module.exports = router
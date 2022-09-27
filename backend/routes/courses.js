const express = require('express')

const router = express.Router()
const {
    createCourse,
    getAllCourses,
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

//GET all courses
router.get('/', getAllCourses)

//POST a new course (add course for us not users, will create one for users to add later on)
router.post('/', createCourse)

//protect api routes, routes after this requires auth
// router.use(requireAuth)

//add courses to timetable
// router.post(('/addCourse', addCourse))
module.exports = router
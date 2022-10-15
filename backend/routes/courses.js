const express = require('express')
const {
    getAllCourses,
    addCourse,
    deleteCourse
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


//GET all courses
router.get('/', getAllCourses)

//POST a new course (NOT FOR REACT)
// router.post('/createCourse', createCourse)

//protect api routes, routes after this requires auth
router.use(requireAuth)

//add courses to timetable
router.post('/addCourse', addCourse)
router.post('/deleteCourse', deleteCourse)
module.exports = router
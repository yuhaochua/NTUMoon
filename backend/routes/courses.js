const express = require('express')

const router = express.Router()
const {
    createCourse,
    getAllCourses,
} = require('../controllers/courseController')

//GET all courses
router.get('/', getAllCourses)

// router.get('/:id', getSingleWorkout)

//POST a new course (for us to add courses, will create one for users to add later on)
router.post('/', createCourse)

// router.delete('/:id', deleteWorkout)


// router.patch('/:id', updateWorkout)

module.exports = router
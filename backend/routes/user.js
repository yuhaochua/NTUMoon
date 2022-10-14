const express = require('express')
const requireAuth = require('../middleware/requireAuth')
// controller functions
const { loginUser, signupUser, changePassword, changeUsername, changeEmail, sendEmail, resetPassword } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// // test send grid
// router.get('/testSendGrid', testSendGrid)

router.post('/sendEmail', sendEmail)
router.post('/resetPassword', resetPassword)

router.use(requireAuth)
//change password, takes in old and new password
router.post('/changePassword', changePassword)

// change username
router.post('/changeUsername', changeUsername)

// change email
router.post('/changeEmail', changeEmail)

module.exports = router
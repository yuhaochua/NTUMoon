const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1h'}) //payload is the user _id from mongodb, we can use this for commenting, users own added module, etc...
}

//signup
const signupUser = async (req, res) => {
    const {username,password} = req.body
    console.log(username)
    console.log(password)
    try {
        const user = await User.signup(username, password) //signup will return user created, with _id, username, password

        //create a token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

//login
const loginUser = async (req, res) => {
    const {username,password} = req.body

    try {
        const user = await User.login(username, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {signupUser, loginUser}
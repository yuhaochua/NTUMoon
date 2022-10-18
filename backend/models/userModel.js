const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method (to define methods in model directly)
userSchema.statics.signup = async function(email, username, password) { //cannot use arrow function as we need to use .this
    console.log("enter sign up")
    //if no username or password provided
    if (!email || !username || !password) {
        throw Error('All fields must be filled!')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
      }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const existsEmail = await this.findOne({ email })
    if (existsEmail) {
        throw Error('Email already in use')
    }

    const existsUsername = await this.findOne({ username })
    if (existsUsername) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    console.log("email, username, password", email, username, password)
    const user = await this.create({ email, username, password: hash })
    console.log(user)

    return user

}

//static login method
userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled!')
    }

    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Incorrect username or password!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect username or password!')
    }

    console.log(user)
    return user
}

    
module.exports = mongoose.model('User', userSchema)
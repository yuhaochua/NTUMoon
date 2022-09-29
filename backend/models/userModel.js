const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
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
userSchema.statics.signup = async function(username, password) { //cannot use arrow function as we need to use .this
    console.log("enter sign up")
    //if no username or password provided
    if (!username || !password) {
        throw Error('All fields must be filled!')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const existsUsername = await this.findOne({ username })
    if (existsUsername) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, username, password: hash })

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
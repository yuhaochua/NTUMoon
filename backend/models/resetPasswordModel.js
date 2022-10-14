const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resetPasswordSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    }
})


    
module.exports = mongoose.model('ResetPassword', resetPasswordSchema)
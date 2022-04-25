const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userPri: {
        type: Number,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    current: {
        type: Boolean,
        required: true
    }
})

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({
        _id: this._id,
    }, process.env.JWTKEY, {expiresIn: '7d'})
    return token
}

const user = mongoose.model("UserDB", userSchema)
module.exports = user
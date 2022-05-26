const mongoose = require("mongoose")

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

const user = mongoose.model("UserDB", userSchema)
module.exports = user
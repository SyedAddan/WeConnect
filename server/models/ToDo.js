const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')

const todoSchema = new mongoose.Schema({
    userMail: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    duedate: {
        type: String,
        required: true
    }
})

const todo = mongoose.model("ToDoDB", todoSchema)
module.exports = todo
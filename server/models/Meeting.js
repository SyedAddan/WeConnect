const mongoose = require("mongoose")

const meetingSchema = new mongoose.Schema({
    by: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stime: {
        type: String,
        required: true
    },
    etime: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const meeting = mongoose.model("MeetingDB", meetingSchema)
module.exports = meeting
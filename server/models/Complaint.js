const mongoose = require("mongoose")

const CompSchema = new mongoose.Schema({
    by: {
        type: String,
        required: true
    },
    towards: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    improvement: {
        type: String,
        required: true
    },
    submittedOn: {
        type: String,
        required: true
    }
})

const comp = mongoose.model("ComplaintsDB", CompSchema)
module.exports = comp
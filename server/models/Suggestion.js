const mongoose = require("mongoose")

const SuggSchema = new mongoose.Schema({
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
    submittedOn: {
        type: String,
        required: true
    }
})

const sugg = mongoose.model("SuggestionsDB", SuggSchema)
module.exports = sugg
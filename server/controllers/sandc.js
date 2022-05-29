const SuggModel = require('../models/Suggestion')
const CompModel = require('../models/Complaint')


const getSandcs = async (req, res) => {

    var sandcs = []
    await SuggModel.find({}, (err, doc) => {
        if (err){
            res.send(err)
        }
        console.log("Adding Suggestions 👒!")
        sandcs.push(doc)
    }).clone()

    await CompModel.find({}, (err, doc) => {
        if (err){
            res.send(err)
        }
        console.log("Adding Complaints 💄!")
        console.log("Sending them both your way 🎿!")
        sandcs.push(doc)
        res.send(sandcs)
    }).clone()
}

const addSuggestion = async (req, res) => {
    const sugg = new SuggModel({
        by: req.body.by,
        topic: req.body.topic,
        description: req.body.description, 
        submittedOn: req.body.date
    })

    await sugg.save((err, doc) => {
        if (err) {
            console.log(err + " 🎗!")
        } else {
            console.log("New Suggestion 👀!")
        }
    })
}

const addComplaint = async (req, res) => {
    const comp = new CompModel({
        by: req.body.by,
        towards: req.body.towards,
        area: req.body.area,
        description: req.body.description,
        improvement: req.body.improvement,
        submittedOn: req.body.date
    })

    await comp.save((err, doc) => {
        if (err) {
            console.log(err + " 🎡!")
        } else {
            console.log("New Complaint 🤨!")
        }
    })
}

module.exports = {
    getSandcs,
    addSuggestion,
    addComplaint
}
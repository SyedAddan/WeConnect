const MeetingModel = require('../models/Meeting')

const getMeetings = async (req, res) => {
    await MeetingModel.find({}, (err, doc) => {
        if (err){
            res.send(err + " 🦓!")
        }
        console.log("Meetings Sent Your Way 🤩!")
        res.send(doc)
    }).clone()
}

const addMeeting = async (req, res) => {
    const by = req.body.by
    const topic = req.body.topic
    const description = req.body.description
    const stime = req.body.stime
    const etime = req.body.etime  
    const status = false

    const meet = new MeetingModel({
        by: by,
        topic: topic,
        description: description, 
        stime: stime,
        etime: etime,
        status: status,
    })

    await meet.save((err, doc) => {
        if (err) {
            console.log(err + " 😌!")
        } else {
            console.log("New Meeting Created 🎃!")
        }
    })
}

const updateMeeting = async (req, res) => {
    await MeetingModel.updateOne({_id: req.body.id}, {status: !req.body.status}, (err, doc) => {
        if (err) {
            return console.log(err + " 🤐!")
        }
        console.log("Meeting completed Woohoo 🎆!")
    }).clone()
}


module.exports = {
    getMeetings,
    addMeeting,
    updateMeeting
}
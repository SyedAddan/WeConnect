const mailjet = require('node-mailjet').connect(process.env.MAILAPIKEY1, process.env.MAILSECRETKEY1)
const dateTime = require('date-and-time')
require('./hooks/pirate.js')()
const template = require('./index.html')


const ToDoModel = require('../models/ToDo')
const MeetingModel = require('../models/Meeting')

const sender = async (req, res) => {
    var todos = await ToDoModel.find({
            userMail: req.body.email,
            status: false
        }, (err, doc) => {
        if (err){
            console.log(err + " 🐙!")
        }
    }).clone()

    var meets = await MeetingModel.find({
        by: req.body.by,
        status: false
    }, (err, doc) => {
        if (err){
            console.log(err + " 🥶!")
        }
    }).clone()

    todos = todoFilterer(todos)
    meets = meetFilterer(meets)

    const message = messageDesigner(todos, meets, req.body.by)

    await mailjet.post("send", { 'version': 'v3.1' }).request({
        "Messages": [
            {
                "From": {
                    "Email": process.env.MAIL,
                    "Name": "WeConnect Admin"
                },
                "To": [
                    {
                        "Email": req.body.email,
                        "Name": req.body.by
                    }
                ],
                "Subject": "Upcoming ToDos and Meetings in the WeConnect App.",
                "TextPart": "Notification Sent",
                "HTMLPart": message,
                "CustomID": "Notification Sender Test"
            }
        ]
    }).then((result) => {
        console.log("Notification Sent 🤳!")
    }).catch((err) => {
        console.log(err.ErrorMessage, err.ErrorRelatedTo[0], "😕")
    })
}

const todoFilterer = (todos) => {
    const filteredTodos = []
    todos.forEach((todo) => {
        const date = new Date(todo.duedate)
        const now = new Date()
        const value = dateTime.subtract(date, now)

        if (value.toHours() < 24) {
            filteredTodos.push(todo)
        }
    })
    return filteredTodos;
}

const meetFilterer = (meets) => {
    const filteredMeets = []
    meets.forEach((meet) => {
        const date = new Date(meet.stime)
        const now = new Date()
        const value = dateTime.subtract(now, date)

        if (value.toHours() < 24) {
            filteredMeets.push(meet)
        }
    })
    return filteredMeets;
}

const messageDesigner = (todos, meets, name) => {
    const message = template.render({
        name: name,
        todocount: todos.length, 
        meetcount: meets.length
    })
    return message
}


module.exports = {
    sender
}
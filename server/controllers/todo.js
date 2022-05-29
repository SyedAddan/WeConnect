const ToDoModel = require('../models/ToDo')


const getToDo = async (req, res) => {
    await ToDoModel.find({}, (err, doc) => {
        if (err){
            res.send(err)
        }
        res.send(doc)
    }).clone()
}

const getOneToDo = async (req, res) => {
    await ToDoModel.findOne(
        { status: false }, (err, doc) => {
        if (err) {
            return console.log(err)
        }
        res.send(doc)
    })
}

const addToDo = async (req, res) => {
    const userMail = req.body.mail
    const task = req.body.task
    const description = req.body.description
    const status = false
    const duedate = req.body.duedate  

    const todo = new ToDoModel({
        userMail: userMail,
        task: task,
        description: description, 
        status: status, 
        duedate: duedate
    })

    await todo.save((err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log("New ToDo Created!")
        }
    })
}

const updateToDo = async (req, res) => {
    await ToDoModel.updateOne({task: req.body.task}, {status: !req.body.status}, (err, doc) => {
        if (err) {
            return console.log(err)
        }
        console.log("ToDo Modified!")
    }).clone()
}


module.exports = {
    getToDo,
    getOneToDo,
    addToDo,
    updateToDo
}
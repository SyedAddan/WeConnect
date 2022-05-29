const ToDoModel = require('../models/ToDo')


const getToDo = async (req, res) => {
    await ToDoModel.find({}, (err, doc) => {
        if (err){
            res.send(err)
        }
        console.log("ToDos Sent Your Way 🎌!")
        res.send(doc)
    }).clone()
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
            console.log(err + " 😫!")
        } else {
            console.log("New ToDo Created ✅!")
        }
    })
}

const updateToDo = async (req, res) => {
    await ToDoModel.updateOne({_id: req.body.id}, {status: !req.body.status}, (err, doc) => {
        if (err) {
            return console.log(err + " 🤷‍♂️!")
        }
        console.log("ToDo Modified 🏀!")
    }).clone()
}


module.exports = {
    getToDo,
    addToDo,
    updateToDo
}
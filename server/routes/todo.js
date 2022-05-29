const express = require('express')
const todoController = require('../controllers/todo')

const router = express.Router()


router.post("/addtodo", todoController.addToDo)

router.get("/gettodo", todoController.getToDo)

router.put("/updatetodo", todoController.updateToDo)


module.exports = router
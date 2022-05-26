const express = require('express')
const todoController = require('../controllers/todo')

const router = express.Router()


router.post("/addtodo", todoController.addToDo)

router.get("/gettodo", todoController.getToDo)

router.post("/updatetodo", todoController.updateToDo)

router.get("/getonetodo", todoController.getOneToDo)


module.exports = router
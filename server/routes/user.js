const express = require('express')
const userController = require('../controllers/user')

const router = express.Router()

router.get("/getUsers", userController.getUsers)

router.get("/getLoginUser", userController.getLoginUser)

router.post("/addUser", userController.addUser)

router.post("/authUser", userController.authUser)

router.put("/toggleLogin", userController.toggleLogin)

module.exports = router
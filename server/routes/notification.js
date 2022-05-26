const express = require('express')
const notificationController = require('../controllers/notification')

const router = express.Router()

router.post('/send', notificationController.sender)

module.exports = router
const express = require('express')
const meetingController = require('../controllers/meeting')

const router = express.Router()


router.post("/addmeet", meetingController.addMeeting)

router.get("/getmeets", meetingController.getMeetings)

router.put("/updatemeet", meetingController.updateMeeting)


module.exports = router
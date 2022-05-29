const express = require('express')
const sandcController = require('../controllers/sandc')

const router = express.Router()


router.post("/addsuggestion", sandcController.addSuggestion)

router.post("/addcomplaint", sandcController.addComplaint)

router.get("/getsandcs", sandcController.getSandcs)


module.exports = router
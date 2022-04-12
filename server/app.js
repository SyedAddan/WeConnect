const connection = require('./db')
const express = require('express')
const cors = require('cors')
const UserModel = require('./models/User')
require('dotenv').config()
const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

connection()

app.post("/api/putData", async (req, res) => {
    const userName = req.body.name
    const userMail = req.body.email
    const userPhone = req.body.phone
    const userRole = req.body.role
    const userPassword = req.body.password

    const user = new UserModel({
        userName: userName,
        userMail: userMail, 
        userPhone: userPhone, 
        userRole: userRole, 
        userPassword: userPassword
    })

    try {
        await user.save((err, doc) => {
            if (err) {
                console.log(err)
            } else {
                console.log("New User Created!")
            }
        })
    } catch (error) {
        console.log("An Error Occured in Creation of User!", error)
    }
})

app.listen(port, () => console.log(`App Listening on port ${port}!`))
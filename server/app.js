require('dotenv').config()
const connection = require('./db')
const express = require('express')
const cors = require('cors')
const UserModel = require('./models/User')
const bcrypt = require('bcrypt')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

connection()

app.get("/getData", async (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err){
            res.send(err)
        }
        res.send(result)
        console.log("User Info Requested!")
    })
})

app.post("/putData", async (req, res) => {
    try {
        const err = validateRegister(req.body)
        if (err) {
            console.log(err)
            return res.status(400).send({message: error.details[0].message})
        }
        const userFind = await UserModel.findOne({ email: req.body.email})
        if (userFind) {
            return res.status(409).send({message: "User with that email already exists!"})
        }

        
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        
        const userPri = req.body.pri
        const userName = req.body.name
        const userMail = req.body.email
        const userPhone = req.body.phone
        const userRole = req.body.role
        const userPassword = hashPassword
        const current = req.body.current

        const user = new UserModel({
            userPri : userPri,
            userName: userName,
            userMail: userMail, 
            userPhone: userPhone, 
            userRole: userRole, 
            userPassword: userPassword,
            current: current
        })

        await user.save((err, doc) => {
            if (err) {
                console.log(err)
            } else {
                console.log("New User Created!")
            }
        })
    } catch (error) {
        res.status(500).send({message: "User Creation Error!"})
        console.log("Here too")
        console.log("An Error Occured in Creation of User!", error)
    }
})

app.get("/authUser", async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }

        const userFind = await UserModel.findOne({ email: req.body.email })
        if (!userFind) {
            res.status(401).send({message: "Invalid Mail!"})
        }
        const validPassword = await bcrypt.compare(
            req.body.password, userFind.userPassword
        )
        if (!validPassword) {
            res.status(401).send({message: "Invalid Password!"})
        }
        const validRole = req.body.password === userFind.userRole
        if (!validRole) {
            res.status(401).send({message: "Invalid Role!"})
        }

        const token = userFind.generateAuthToken()
        res.status(200).send({data: token, message: "Logged In Successfully!"})
    } catch (error) {
        res.status(500).send({message: "Login Error!"})
    }
})

const validateLogin = (data) => {
    const schema = joi.object({
        userMail: joi.string().email().required().label("userMail"),
        userPassword: joi.string().required().label("userPassword"),
        userRole: joi.string().required().label("userRole")
    })
    return schema.validate(data)
}

const validateRegister = (data) => {
    const schema = joi.object({
        pri: joi.number().required().label('pri'),
        name: joi.string().required().label('name'),
        email: joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password'),
        role: joi.string().required().label('role'),
        phone: joi.string().required().label('phone'),
        current: joi.boolean().required().label('current')
    })
    return schema.validate(data)
}

app.listen(port, () => console.log(`App Listening on port ${port}!`))
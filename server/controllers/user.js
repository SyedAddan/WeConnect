const UserModel = require('../models/User')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const getUsers = async (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err){
            res.send(err)
        }
        res.send(result)
        console.log("User Info Requested!")
    }).clone()
}

const getLoginUser = async (req, res) => {
    await UserModel.findOne({ current: true }, (err, doc) => {
        if (err)
        {
            return console.log(err)
        }
        res.send(doc)
    }).clone()
}

const addUser = async (req, res) => {
    try {
        const { error } = validateRegister(req.body)
        if (error) {
            console.log(error)
            return res.status(400).send({message: error.details[0].message})
        }

        const passwordCheck = req.body.password === req.body.confirmedPassword
        if (!passwordCheck) {
            console.log("Passwords don't match!")
            return res.status(401).send({message: "Passwords don't match!"})
        }

        const userFind = await UserModel.findOne({userMail: req.body.email})
        if (userFind) {
            console.log("User Alreaedy Exists!")
            console.log(userFind)
            return res.status(409).send({message: "User with that email already exists!"})
        }
        
        const userPri = req.body.pri
        const userName = req.body.name
        const userMail = req.body.email
        const userPhone = req.body.phone
        const userRole = req.body.role
        const userPassword = req.body.password
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
        console.log("An Error Occured in Creation of User!")
        console.log(error)
    }
}

const authUser = async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) {
            console.log(error.details[0].message)
            return res.status(400).send({message: error.details[0].message})
        }

        const userFind = await UserModel.findOne({ userMail: req.body.email })
        if (!userFind) {
            console.log("Invalid Mail!")
            return res.status(401).send({message: "Invalid Mail!"})
        }
        const validPassword = req.body.password === userFind.userPassword
        if (!validPassword) {
            console.log("Invalid Password!")
            return res.status(401).send({message: "Invalid Password!"})
        }
        const validRole = req.body.role === userFind.userRole
        if (!validRole) {
            console.log("Invalid Role!")
            return res.status(401).send({message: "Invalid Role!"})
        }

        return res.status(200).send({data: userFind, message: "Logged In Successfully!"})
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error!"})
    }
}



const toggleLogin = async (req, res) => {
    const id = req.body.id
    const current = req.body.current
    await UserModel.updateOne({_id: id}, { current: !current }, (err, doc) => {
        if (err)
        {
            return console.log(err)
        }
        res.send(doc)
    }).clone().catch((err) => {
        console.log(err)
    })
}

const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("email"),
        password: joi.string().required().label("password"),
        role: joi.string().required().label("role")
    })
    return schema.validate(data)
}

const validateRegister = (data) => {
    const schema = joi.object({
        pri: joi.number().label('pri'),
        name: joi.string().required().label('name'),
        email: joi.string().email().required().label('email'),
        password: passwordComplexity().required().label('password'),
        confirmedPassword: joi.string().required().label('confirmedPassword'),
        role: joi.string().required().label('role'),
        phone: joi.string().required().label('phone'),
        current: joi.boolean().required().label('current')
    })
    return schema.validate(data)
}

module.exports = {
    getUsers,
    getLoginUser,
    addUser,
    authUser,
    toggleLogin
}
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const connection = require('./config/db')
const userRoutes = require("./routes/user")

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors())
connection()
app.use("/", userRoutes)

app.listen(port, () => console.log(`App Listening on port ${port}!`))
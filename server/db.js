const mongoose = require('mongoose')


module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(
            process.env.DB,
            connectionParams
        )
        console.log("Connected to Database!")
    } catch (error) {
        console.log("Could not Connect to Database!", error)
    }
}
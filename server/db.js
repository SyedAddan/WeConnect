const mongoose = require('mongoose')


module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(
            'mongodb+srv://admin:1234@userdata.a0x5w.mongodb.net/UserDB?retryWrites=true&w=majority',
            connectionParams
        )
        console.log("Connected to Database!")
    } catch (error) {
        console.log("Could not Connect to Database!", error)
    }
}
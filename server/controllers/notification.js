var nodemailer = require('nodemailer')

sender = async(req, res) => {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAILKEY
        },
    });
    
    
    var mailOptions = {
        from: process.env.MAIL,
        to: req.body.email,
        subject: "Testing Notification Mail",
        text: "Hello world",
    };
    
    transporter.sendMail(mailOptions, function (error,info) {
        if(error){
            console.log(error);
        }
        else{
            console.log(mailOptions)
            console.log("Email Notification Sent")
        }
    })
}

module.exports = {
    sender
}
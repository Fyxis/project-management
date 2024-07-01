const mail = require('nodemailer')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const sendMail = (nameTo, emailTo) => {
    const ejsPath = path.join(__dirname, '../view/email.ejs')
    const emailView = fs.readFileSync(ejsPath, 'utf-8')
    
    let email = process.env.MAIL_EMAIL
    let password = process.env.MAIL_PASSWORD
    
    const transporter = mail.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    })
    
    const data = {
        name: nameTo,
        title: "You're account has been succesfully created on my app. The code is '49102', please to fill in the web. The code has been expired in 10 minutes"
    }
    
    const html = ejs.render(emailView, data)
    
    const mailOptions = {
        from: email,
        to: emailTo,
        subject: 'Welcome to MyApp',
        html: html
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return error
        } else {
            console.log("Email has been sended to", emailTo)
            return true
        }
    })
}

module.exports = sendMail
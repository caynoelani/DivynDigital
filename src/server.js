// =====================
// ==MODULES & IMPORTS==
// =====================

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

const nodemailer = require('nodemailer')
require("dotenv").config();

// ==============
// ==MIDDLEWARE==
// ==============


// ==============
// ====ROUTES====
// ==============
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'))
})

// express
app.use('/assets', express.static(path.join(__dirname, '../public')))
app.use(express.json())

app.post('/contact', (req, res) => {
    console.log(req.body)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        auth: {
            user: process.env.CONTACT_EMAIL, //env
            pass: process.env.CONTACT_EMAIL_PASSWORD, //env
        },
    });

    const mailOptions = {
        from: `<${req.body.email}>`,
        to: process.env.CONTACT_EMAIL, //env
        subject: `Contact Request from ${req.body.email}`,
        html: `
            <p>Name: ${req.body.fullName}</p>
            <p>Email: ${req.body.email}</p>
            <p>Phone Number: ${req.body.phoneNumber}</p>
            <p>Comment: ${req.body.message}</p>
        `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
            res.send('error')
        }else {
            console.log('Message Sent')
            res.send('success')
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
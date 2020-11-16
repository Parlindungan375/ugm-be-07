import nodemailer from 'nodemailer'
import path from 'path'

const sendEmail = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../my-app/build/contact_form.html'));

    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: 'lexia.himura@gmail.com',
            pass: 'Lexia_kalem11'
        }
    })
    
    var mailOptions = {
        from: 'lexia.himura@gmail.com',
        to: 'agung.arisudana@gmail.com',
        subject: 'Sending Email using Nodejs',
        text: 'Easy'
    }

    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) throw err;
            console.log('Email sent: ', + info.respose)
        })
    } catch (error) {
        console.log('Send Email Failed')
    }
}

export default {sendEmail}


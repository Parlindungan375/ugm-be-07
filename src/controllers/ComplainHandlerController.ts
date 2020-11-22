const SqlString = require('sqlstring');
const transporter = require('.././config/config');
const db = require('.././config/db_config');

import dotenv from 'dotenv'

dotenv.config();

// db.connect(function(err) {
//   if (err) throw err;
 
//   let use = SqlString.format('USE ?', process.env.database);
//   db.query(use, function (err, result) {
//       if (err) throw err;
//       console.log("USE DATABASE", process.env.database);
//   });
// });

const historyTicket = async (req, res, next) => {

}
// Mendapatkan semua complaint yang belum ditanggapi
const getRandTicket = async (req, res, next) => {
  try{
    let sql = SqlString.format(`SELECT c.subject, c.content, cc.name as categories, cs.name as status, c.completed_at, c.created_at FROM complaint c  
                INNER JOIN complaint_categories cc ON cc.id = c.cat_id 
                INNER JOIN complaint_status cs ON cs.code = c.status_code
                WHERE c.cat_id = 0
                LIMIT 1
                `);
        db.query(sql, function (err, result) {
            if (err) throw err;
            if(result === undefined || result.length == 0) {
              res.status(500).json({ message: 'Data not found' })
            }else {
              res.json(result)
            }
        });
  }catch(err){
    res.status(500).json({ error: err })
  }
}
// Mendapatkan semua complaint
const getComplainTicket = async (req, res, next) => {
  try{
    let sql = SqlString.format(`SELECT c.subject, c.content, cc.name as categories, cs.name as status, c.completed_at, c.created_at FROM complaint c  
                INNER JOIN complaint_categories cc ON cc.id = c.cat_id 
                INNER JOIN complaint_status cs ON cs.id = c.status_id
                
                `);
        db.query(sql, function (err, result) {
            if (err) throw err;
            if(result === undefined || result.length == 0) {
              res.status(500).json({ message: 'Data not found' })
            }else {
              res.json(result)
            }
        });
  }catch(err){
    res.status(500).json({ error: err })
  }
}



const changeStatus = async (req, res, next) => {
  try{

  }catch(err){

  }
}

// const sendEmail = async (req, res, next) => {
// try {
//     const mailOptions = {
//       from: process.env.email, // sender address
//       to: req.body.email, // list of receivers
//       subject: req.body.subject, // Subject line
//       html: `
//       <p>You have a new contact request.</p>
//       <h3>Contact Details</h3>
//       <ul>
//         <li>Name: ${req.body.name}</li>
//         <li>Email: ${req.body.email}</li>
//         <li>Subject: ${req.body.subject}</li>
//         <li>Message: ${req.body.message}</li>
//       </ul>
//       `
//     };

//     transporter.sendMail(mailOptions, function (err, info) {
//       if (err) {
//         res.status(500).send({
//           success: false,
//           message: 'Something went wrong. Try again later'
//         });
//       } else {
//         res.send({
//           success: true,
//           message: 'Thanks for contacting us. We will get back to you shortly'
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: 'Something went wrong. Try again later'
//     });
//   }
// }

export default {changeStatus, getComplainTicket, getRandTicket, historyTicket}
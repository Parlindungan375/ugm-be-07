const SqlString = require('sqlstring');
const transporter = require('.././config/config');
const db = require('.././config/db_config');

import dotenv from 'dotenv'

dotenv.config();

const addComment = async (req, res, next) => {
    var datetime = new Date();
    let complaint_id = req.body.complaint_id
    try {
        let sql = "INSERT INTO complaint_comment(complaint_id, cs_id, content, created_at) VALUES ?"
        var values = [
            [complaint_id, req.body.cs_id, req.body.content, datetime]
        ]
        db.query(sql, [values], function (err, result) {
            if(err) throw err
            let status = "1"
            changeComplaintStatus(status, complaint_id)
            res.json({
                status: "success",
                message: "Number of records inserted: " + result.affectedRows
            })
        })
    } catch(err){
        res.status(500).json({ error: err })
    }
}

const updateComment = async (req, res, next) => {
    var datetime = new Date();
    try {
        // update customer_service
        let sql = `UPDATE complaint_comment
                SET content = ?, updated_at = ?
                WHERE complaint_id=?`;
        let data = [ 
                     req.body.content,
                     datetime,
                     req.body.complaint_id
                    ]
        db.query(sql, data,  function (err, result) {
            if (err) throw err;
            res.json({
                status: "success",
                message: "Number of records updated: " + result.affectedRows
            })
        });

    }catch(err) {
        res.status(500).json({ error: err })
    }
}
// menampilkan seluruh comment dari suatu complaint/ ticket
// const showCommentByComplaint = async (req,res,next) => {
//     try {
//         let sql = ` SELECT ticket.content as comment_text, 
//                     ticket.created_at as date, 
//                     cs.name, 
//                     comp.id, 
//                     comp.subject as subject, 
//                     comp.content as complaint_text,
//                     comp.created_at as comp_date,
//                     comp.completed_at as replied_date,
//                     stat.name 
//                     FROM complaint_comment as ticket
//                     INNER JOIN complaint 
//                     `
//     }
// }

// change complaint status
const changeComplaintStatus = async (status,complaint_id) => {
    var datetime = new Date();
    try {
        let sql = ` UPDATE complaint
                    SET status_code = ?, completed_at = ?
                    WHERE id = ? 
                  `;
        let data = [ 
            status,
            datetime,
            complaint_id
        ]  
        db.query(sql, data,  function (err, result) {
            if (err) throw err;    
            console.log("status change")
        });            
    } catch(err){
        console.log(err)        
    }
}

export default {addComment, updateComment}
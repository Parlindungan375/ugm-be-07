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
const showCommentByComplaint = async (req,res,next) => {
    try {
        let sql = ` SELECT ticket.content AS comment_text, 
                    ticket.created_at AS DATE, 
                    cs.fake_name, 
                    comp.id, 
                    comp.subject AS SUBJECT, 
                    comp.content AS complaint_text,
                    comp.created_at AS comp_date,
                    comp.completed_at AS replied_date,
                    stat.name 
                    FROM complaint_comment AS ticket
                    INNER JOIN complaint AS comp ON comp.id = ticket.complaint_id
                    INNER JOIN customer_service AS cs ON cs.id = ticket.cs_id
                    INNER JOIN complaint_status AS stat ON stat.code = comp.status_code
                `
        db.query(sql,  function (err, result) {
            if (err) throw err;    
            res.json({
                status: "success",
                data: result
            })
        });
        
    } catch(err) {
        console.log(err)
    }
}

// change complaint status
function changeComplaintStatus(status, complaint_id) {
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
        ];
        db.query(sql, data, function (err, result) {
            if (err)
                throw err;
            console.log("status change");
        });
    } catch (err) {
        console.log(err);
    }
}

export default {addComment, updateComment, showCommentByComplaint}
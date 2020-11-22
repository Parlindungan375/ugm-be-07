const SqlString = require('sqlstring');
const transporter = require('.././config/config');
const db = require('.././config/db_config');

import dotenv from 'dotenv'

dotenv.config();

const addComment = async (req, res, next) => {
    var datetime = new Date();
    try {
        let sql = "INSERT INTO complaint_comment(complaint_id, cs_id, content, created_at) VALUES ?"
        var values = [
            [req.body.complaint_id, req.body.cs_id, req.body.content, datetime]
        ]
        db.query(sql, [values], function (err, result) {
            if(err) throw err
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

}

export default {addComment, updateComment, showCommentByComplaint}
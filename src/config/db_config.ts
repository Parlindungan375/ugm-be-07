import mysql from 'mysql'

import dotenv from 'dotenv'

dotenv.config()

var db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: "complaint_handling"
});

module.exports = db;
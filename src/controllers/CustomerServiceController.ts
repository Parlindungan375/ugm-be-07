const SqlString = require('sqlstring');
const db = require('.././config/db_config');

db.connect(function(err) {
    if (err) throw err;
   
    let create_table = `CREATE TABLE IF NOT EXISTS customers 
    (
        id int NOT NULL AUTO_INCREMENT,
        name VARCHAR(255), 
        address VARCHAR(255),
        PRIMARY KEY (id)
    )`;
    db.query(create_table, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

const dissable = async(id) => {
    let sql = `UPDATE customer_service
        SET status = ?
        WHERE id=?`;
    let data = [ 
                0,
                id 
            ]
    db.query(sql, data,  function (err, result) {
        if (err) throw err;
    });
}
const enable = async(id) => {
    let sql = `UPDATE customer_service
        SET status = ?
        WHERE id=?`;
    let data = [ 
                1,
                id 
            ]
    db.query(sql, data,  function (err, result) {
        if (err) throw err;
    });
}

const dissableCs = async (req, res, next) => {
    try {
        let select = SqlString.format(`SELECT status FROM customer_service WHERE id=?`, req.body.id)
        db.query(select, function (err, results, fields) {
            if (err) throw err
            for (var i in results) {
                if(results[i].status == 1 || results[i].status == '1'){
                    dissable(req.body.id)
                }else{
                    enable(req.body.id)
                }
            }
        });
    } catch(err) {
        res.status(500).json({ error: err })
    }
}

const getAll = async (req,res,next) => {
    try{
        let sql = "SELECT * FROM customer_service";
        db.query(sql, function (err, result) {
            if (err) throw err;
            res.json(result)
        });
    }catch(err) {
        res.status(500).json({ error: err })
    }
} 

const addCs = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    try {
        let sql = "INSERT INTO customer_service(real_name, fake_name, password) VALUES ?"
        var values = [
            [req.body.realname, req.body.fakename, req.body.password]
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

const addCustomer = async (req, res, next) => {
    try {
        let sql = "INSERT INTO customer (full_name, email, no_ktp, no_hp, no_rekening, username, password) VALUES ?";
        var values = [
            [req.body.full_name, req.body.email, req.body.no_ktp, req.body.no_hp, req.body.no_rekening, req.body.username, req.body.password]
        ];
        // var values = [
        //     ['JS Coffee', 'Highway 71'],
        //     ['3AM Coffee', 'Lowstreet 4']
        // ];
        db.query(sql, [values], function (err, result) {
            if (err) throw err;
            res.json({
                status: "success",
                message: "Number of records inserted: " + result.affectedRows
            })
        });
    } catch(err) {
        res.status(500).json({ error: err })
    }
}

const updateCs = async (req, res, next) => {
    try {
        // update customer_service
        let sql = `UPDATE customer_service
                SET real_name = ?, status = ?, fake_name = ?, real_photo = ?, fake_photo = ?
                WHERE id=?`;
        let data = [ req.body.real_name,
                     req.body.status,
                     req.body.fake_name, 
                     req.body.real_photo, 
                     req.body.fake_photo,
                     req.body.id 
                    ]
        db.query(sql, data,  function (err, result) {
            if (err) throw err;
            res.json({
                status: "success",
                message: "Number of records inserted: " + result.affectedRows
            })
        });

    }catch(err) {
        res.status(500).json({ error: err })
    }
}

// const deleteCs = async (req, res, next) => {
//     try {
//         let sql = `DELETE FROM customers WHERE id=1`;

//         db.query(sql, function (err) {
//             if (err) throw err;
//             console.log("Number of records inserted: " + result.affectedRows);
//         });
//     }catch(err) {
//         throw err
//     }
// }


export default {getAll, addCs, updateCs, dissableCs, addCustomer}
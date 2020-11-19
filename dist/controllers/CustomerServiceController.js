"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var SqlString = require('sqlstring');
var db = require('.././config/db_config');
db.connect(function (err) {
    if (err)
        throw err;
    var create_table = "CREATE TABLE IF NOT EXISTS customers \n    (\n        id int NOT NULL AUTO_INCREMENT,\n        name VARCHAR(255), \n        address VARCHAR(255),\n        PRIMARY KEY (id)\n    )";
    db.query(create_table, function (err, result) {
        if (err)
            throw err;
        console.log("Table created");
    });
});
var dissable = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, data;
    return __generator(this, function (_a) {
        sql = "UPDATE customer_service\n        SET status = ?\n        WHERE id=?";
        data = [
            0,
            id
        ];
        db.query(sql, data, function (err, result) {
            if (err)
                throw err;
        });
        return [2 /*return*/];
    });
}); };
var enable = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, data;
    return __generator(this, function (_a) {
        sql = "UPDATE customer_service\n        SET status = ?\n        WHERE id=?";
        data = [
            1,
            id
        ];
        db.query(sql, data, function (err, result) {
            if (err)
                throw err;
        });
        return [2 /*return*/];
    });
}); };
var dissableCs = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var select;
    return __generator(this, function (_a) {
        try {
            select = SqlString.format("SELECT status FROM customer_service WHERE id=?", req.body.id);
            db.query(select, function (err, results, fields) {
                if (err)
                    throw err;
                for (var i in results) {
                    if (results[i].status == 1 || results[i].status == '1') {
                        dissable(req.body.id);
                    }
                    else {
                        enable(req.body.id);
                    }
                }
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
var getAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        try {
            sql = "SELECT * FROM customer_service";
            db.query(sql, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
var addCs = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, values;
    return __generator(this, function (_a) {
        try {
            sql = "INSERT INTO customer_service(real_name, status, fake_name, real_photo, fake_photo) VALUES ?";
            values = [
                [req.body.real_name, req.body.status, req.body.fake_name, req.body.real_photo, req.body.fake_photo]
            ];
            db.query(sql, [values], function (err, result) {
                if (err)
                    throw err;
                res.json({
                    status: "success",
                    message: "Number of records inserted: " + result.affectedRows
                });
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
var addCustomer = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, values;
    return __generator(this, function (_a) {
        try {
            sql = "INSERT INTO customer (full_name, email, no_ktp, no_hp, no_rekening, username, password) VALUES ?";
            values = [
                [req.body.full_name, req.body.email, req.body.no_ktp, req.body.no_hp, req.body.no_rekening, req.body.username, req.body.password]
            ];
            // var values = [
            //     ['JS Coffee', 'Highway 71'],
            //     ['3AM Coffee', 'Lowstreet 4']
            // ];
            db.query(sql, [values], function (err, result) {
                if (err)
                    throw err;
                res.json({
                    status: "success",
                    message: "Number of records inserted: " + result.affectedRows
                });
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
var updateCs = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, data;
    return __generator(this, function (_a) {
        try {
            sql = "UPDATE customer_service\n                SET real_name = ?, status = ?, fake_name = ?, real_photo = ?, fake_photo = ?\n                WHERE id=?";
            data = [req.body.real_name,
                req.body.status,
                req.body.fake_name,
                req.body.real_photo,
                req.body.fake_photo,
                req.body.id
            ];
            db.query(sql, data, function (err, result) {
                if (err)
                    throw err;
                res.json({
                    status: "success",
                    message: "Number of records inserted: " + result.affectedRows
                });
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
var deleteCs = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        try {
            sql = "DELETE FROM customers WHERE id=1";
            db.query(sql, function (err, result) {
                if (err)
                    throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
        }
        catch (err) {
            throw err;
        }
        return [2 /*return*/];
    });
}); };
exports.default = { getAll: getAll, addCs: addCs, updateCs: updateCs, deleteCs: deleteCs, dissableCs: dissableCs, addCustomer: addCustomer };

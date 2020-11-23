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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SqlString = require('sqlstring');
var transporter = require('.././config/config');
var db = require('.././config/db_config');
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// db.connect(function(err) {
//   if (err) throw err;
//   let use = SqlString.format('USE ?', process.env.database);
//   db.query(use, function (err, result) {
//       if (err) throw err;
//       console.log("USE DATABASE", process.env.database);
//   });
// });
var historyTicket = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        try {
            sql = " SELECT ticket.content AS comment_text, \n                    ticket.created_at AS DATE, \n                    cs.fake_name, \n                    comp.id, \n                    comp.subject AS SUBJECT, \n                    comp.content AS complaint_text,\n                    comp.created_at AS comp_date,\n                    comp.completed_at AS replied_date,\n                    stat.name,\n                    cat.name \n                    FROM complaint AS comp\n                    LEFT JOIN complaint_comment AS ticket ON comp.id = ticket.complaint_id\n                    LEFT JOIN customer_service AS cs ON cs.id = ticket.cs_id\n                    LEFT JOIN complaint_status AS stat ON stat.code = comp.status_code\n                    LEFT JOIN complaint_categories as cat ON cat.id = comp.cat_id\n                ";
            db.query(sql, function (err, result) {
                if (err)
                    throw err;
                res.json({
                    status: "success",
                    data: result
                });
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
// Mendapatkan semua complaint yang belum ditanggapi
var getRandTicket = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        try {
            sql = SqlString.format("SELECT c.subject, c.content, cc.name as categories, cs.name as status, c.completed_at, c.created_at FROM complaint c  \n                INNER JOIN complaint_categories cc ON cc.id = c.cat_id \n                INNER JOIN complaint_status cs ON cs.code = c.status_code\n                WHERE c.cat_id = 0\n                LIMIT 1\n                ");
            db.query(sql, function (err, result) {
                if (err)
                    throw err;
                if (result === undefined || result.length == 0) {
                    res.status(500).json({ message: 'Data not found' });
                }
                else {
                    res.json(result);
                }
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
// Mendapatkan semua complaint
var getComplainTicket = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sql;
    return __generator(this, function (_a) {
        try {
            sql = SqlString.format("SELECT c.subject, c.content, cc.name as categories, cs.name as status, c.completed_at, c.created_at FROM complaint c  \n                INNER JOIN complaint_categories cc ON cc.id = c.cat_id \n                INNER JOIN complaint_status cs ON cs.id = c.status_id\n                \n                ");
            db.query(sql, function (err, result) {
                if (err)
                    throw err;
                if (result === undefined || result.length == 0) {
                    res.status(500).json({ message: 'Data not found' });
                }
                else {
                    res.json(result);
                }
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
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
exports.default = { getComplainTicket: getComplainTicket, getRandTicket: getRandTicket, historyTicket: historyTicket };

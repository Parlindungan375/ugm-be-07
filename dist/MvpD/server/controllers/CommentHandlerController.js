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
var addComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var datetime, sql, values;
    return __generator(this, function (_a) {
        datetime = new Date();
        try {
            sql = "INSERT INTO complaint_comment(complaint_id, cs_id, content, created_at) VALUES ?";
            values = [
                [req.body.complaint_id, req.body.cs_id, req.body.content, datetime]
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
var updateComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var datetime, sql, data;
    return __generator(this, function (_a) {
        datetime = new Date();
        try {
            sql = "UPDATE complaint_comment\n                SET content = ?, updated_at = ?\n                WHERE complaint_id=?";
            data = [
                req.body.content,
                datetime,
                req.body.complaint_id
            ];
            db.query(sql, data, function (err, result) {
                if (err)
                    throw err;
                res.json({
                    status: "success",
                    message: "Number of records updated: " + result.affectedRows
                });
            });
        }
        catch (err) {
            res.status(500).json({ error: err });
        }
        return [2 /*return*/];
    });
}); };
// menampilkan seluruh comment dari suatu complaint/ ticket
var showCommentByComplaint = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
exports.default = { addComment: addComment, updateComment: updateComment, showCommentByComplaint: showCommentByComplaint };

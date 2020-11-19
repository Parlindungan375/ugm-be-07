"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var db = mysql_1.default.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: "complaint_handling"
});
module.exports = db;

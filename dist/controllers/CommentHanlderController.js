"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SqlString = require('sqlstring');
var transporter = require('.././config/config');
var db = require('.././config/db_config');
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SendEmailController_1 = __importDefault(require("./controllers/SendEmailController"));
var routes = express_1.Router();
routes.get('/send', SendEmailController_1.default.sendEmail);
exports.default = routes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var transporter = require('./config');
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = express_1.default();
var buildPath = path_1.default.join(__dirname, '..', 'build');
app.use(express_1.default.json());
app.use(express_1.default.static(buildPath));
app.post('/send', function (req, res) {
    try {
        var mailOptions = {
            from: process.env.email,
            to: req.body.email,
            subject: req.body.subject,
            html: "\n      <p>You have a new contact request.</p>\n      <h3>Contact Details</h3>\n      <ul>\n        <li>Name: " + req.body.name + "</li>\n        <li>Email: " + req.body.email + "</li>\n        <li>Subject: " + req.body.subject + "</li>\n        <li>Message: " + req.body.message + "</li>\n      </ul>\n      "
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Something went wrong. Try again later'
                });
            }
            else {
                res.send({
                    success: true,
                    message: 'Thanks for contacting us. We will get back to you shortly'
                });
            }
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong. Try again later'
        });
    }
});
app.listen(3030, function () {
    console.log('server start on port 3030');
});

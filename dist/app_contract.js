"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var querystring_1 = __importDefault(require("querystring"));
var nodemailer_1 = __importDefault(require("nodemailer"));
http_1.default.createServer(function (req, res) {
    if (req.url === "/") {
        // redirect ke halaman contact form
        res.writeHead(302, {
            'Location': '/contact/'
        });
        res.end();
    }
    // load the contact form
    if (req.url === "/contact/" && req.method === "GET") {
        fs_1.default.readFile("contact_form.html", function (err, data) {
            if (err)
                throw err;
            res.end(data);
        });
    }
    // send the email
    if (req.url === "/contact/" && req.method === "POST") {
        var requestBody = '';
        req.on('data', function (data) {
            // tangkap data dari form
            requestBody += data;
            // kirim balasan jika datanya terlalu besar
            if (requestBody.length > 1e7) {
                res.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
                res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
            }
        });
        req.on('end', function () {
            var formData = querystring_1.default.parse(requestBody);
            // send the email
            var transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'youremail@gmail.com',
                    pass: 'your password'
                }
            });
            var email = formData.email || 'lexia.himura@gmail.com';
            var subject = formData.subject || 'testing';
            var message = formData.message || 'message';
            var mailOptions = {
                from: 'lexia.himura@gmail.com',
                replyTo: 'lexia.himura@gmail.com',
                to: 'lexia.himura@gmail.com',
                subject: 'subject',
                text: 'text'
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    throw err;
                console.log('Email sent: ' + info.response);
                res.end("Thank you!");
            });
        });
    }
}).listen(8000);
console.log('server listening on http://localhost:8000/');

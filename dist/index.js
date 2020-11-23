"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
var ngrok_1 = __importDefault(require("ngrok"));
var cool = require('cool-ascii-faces');
var app = express_1.default();
app.use(cors_1.default());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3030"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var buildPath = path_1.default.join(__dirname, '..', 'build');
app.use(express_1.default.json());
app.use(express_1.default.static(buildPath));
app.use('/admin', routes_1.default);
app.get('/cool', function (req, res) { return res.send(cool()); });
app.listen(process.env.PORT, function () {
    console.log('server start on port ', process.env.PORT);
});
ngrok_1.default
    .connect({
    proto: 'http',
    addr: process.env.PORT,
})
    .then(function (url) {
    console.log("\uD83D\uDCB3  App URL to see the demo in your browser: " + url + "/");
})
    .catch(function (err) {
    if (err.code === 'ECONNREFUSED') {
        console.log("\u26A0\uFE0F  Connection refused at " + err.address + ":" + err.port);
    }
    else {
        console.log("\u26A0\uFE0F Ngrok error: " + JSON.stringify(err));
    }
    process.exit(1);
});

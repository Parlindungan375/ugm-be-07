"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors_1 = __importDefault(require("cors"));
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
app.listen(3030, function () {
    console.log('server start on port 3030');
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ComplainHandlerController_1 = __importDefault(require("./controllers/ComplainHandlerController"));
var CustomerServiceController_1 = __importDefault(require("./controllers/CustomerServiceController"));
var CommentHandlerController_1 = __importDefault(require("./controllers/CommentHandlerController"));
var routes = express_1.Router();
// Complaint Controller
// routes.post('/mail', ComplainController.sendEmail)
routes.get('/ticket', ComplainHandlerController_1.default.getComplainTicket);
routes.get('/rand', ComplainHandlerController_1.default.getRandTicket);
// Comment Controller
routes.post('/comment', CommentHandlerController_1.default.addComment);
routes.put('/update_comment', CommentHandlerController_1.default.updateComment);
// CS Controller
routes.get('/cs', CustomerServiceController_1.default.getAll);
routes.post('/add', CustomerServiceController_1.default.addCs);
routes.put('/update', CustomerServiceController_1.default.updateCs);
// routes.post('/delete', CSController.deleteCs)
routes.put('/disable', CustomerServiceController_1.default.dissableCs);
// add customer
routes.post('add/customer', CustomerServiceController_1.default.addCustomer);
exports.default = routes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ComplainHandlerController_1 = __importDefault(require("./controllers/ComplainHandlerController"));
var CustomerServiceController_1 = __importDefault(require("./controllers/CustomerServiceController"));
var routes = express_1.Router();
// Complaint Controller
routes.post('/mail', ComplainHandlerController_1.default.sendEmail);
routes.get('/ticket', ComplainHandlerController_1.default.getComplainTicket);
routes.get('/rand', ComplainHandlerController_1.default.getRandTicket);
// CS Controller
routes.get('/cs', CustomerServiceController_1.default.getAll);
routes.post('/add', CustomerServiceController_1.default.addCs);
routes.put('/update', CustomerServiceController_1.default.updateCs);
routes.post('/delete', CustomerServiceController_1.default.deleteCs);
routes.put('/disable', CustomerServiceController_1.default.dissableCs);
// add customer
routes.post('add/customer', CustomerServiceController_1.default.addCustomer);
exports.default = routes;

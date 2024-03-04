"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dependencies_1 = require("./dependencies");
const paymentRouter = (0, express_1.Router)();
paymentRouter.post("/", dependencies_1.createPaymentController.run.bind(dependencies_1.createPaymentController));
exports.default = paymentRouter;

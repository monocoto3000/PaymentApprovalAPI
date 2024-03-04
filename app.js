"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const paymentRouter_1 = __importDefault(require("./src/payment/infraestructure/paymentRouter"));
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/approved", paymentRouter_1.default);
app.use("*", (req, res) => {
    res.status(404).send("not found");
});
app.listen(3001, () => {
    console.log(`Server running on port 3001`);
});

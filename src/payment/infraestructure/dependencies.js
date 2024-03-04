"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentController = void 0;
const createPaymentUseCase_1 = require("../application/createPaymentUseCase");
const deliverMessage_1 = require("../../shared/broker/application/deliverMessage");
const SocketIO_1 = require("../../shared/socket/infraestructure/SocketIO");
const deliverDatatoClientUseCase_1 = require("../../shared/socket/application/deliverDatatoClientUseCase");
const CreatePaymentController_1 = require("./controllers/CreatePaymentController");
const Amqplib_1 = require("../../shared/broker/infraestructure/Amqplib");
// Ports
const amqplLib = new Amqplib_1.Amqplib("amqp://52.6.228.180/");
const socketIo = new SocketIO_1.SocketIO("http://localhost:4000");
//Deliver data
const DeliverMessagetoQueue = new deliverMessage_1.deliverMessagetoQueue(amqplLib);
const sendDataService = new deliverDatatoClientUseCase_1.deliverDatatoClient(socketIo);
//Create message
const createPaymentService = new createPaymentUseCase_1.CreatePaymentUseCase(DeliverMessagetoQueue, sendDataService);
exports.createPaymentController = new CreatePaymentController_1.CreatePaymentController(createPaymentService);

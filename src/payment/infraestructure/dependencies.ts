import { CreatePaymentUseCase } from "../application/createPaymentUseCase";
import { deliverMessagetoQueue } from "../../shared/broker/application/deliverMessage";
import { SocketIO } from "../../shared/socket/infraestructure/SocketIO";
import { deliverDatatoClient } from "../../shared/socket/application/deliverDatatoClientUseCase";
import { CreatePaymentController } from "./controllers/CreatePaymentController";
import { Amqplib } from "../../shared/broker/infraestructure/Amqplib";

// Ports
const amqplLib = new Amqplib("amqp://52.6.228.180/");
const socketIo = new SocketIO("http://localhost:4000");

//Deliver data
const DeliverMessagetoQueue = new deliverMessagetoQueue(amqplLib);
const sendDataService = new deliverDatatoClient(socketIo)

//Create message
const createPaymentService = new CreatePaymentUseCase(DeliverMessagetoQueue, sendDataService);
export const createPaymentController = new CreatePaymentController(createPaymentService);
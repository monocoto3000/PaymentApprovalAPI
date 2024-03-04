import { deliverMessagetoQueue } from "../../shared/broker/application/deliverMessage";
import { CreatePaymentUseCase } from "../application/createPaymentUseCase";
import { SocketIOPort } from "../../shared/socket/infraestructure/SocketIO";
import { deliverDatatoClient } from "../../shared/socket/application/deliverDatatoClientUseCase";
import { CreatePaymentController } from "./controllers/CreatePaymentController";
import { Amqplib } from "../../shared/broker/infraestructure/Amqplib";

// Ports
const amqplLib = new Amqplib("amqp://localhost");
const socketIoPort = new SocketIOPort("http://52.72.28.83:5000");

//Deliver data
const DeliverMessagetoQueue = new deliverMessagetoQueue(amqplLib);
const sendDataService = new deliverDatatoClient(socketIoPort)

//Create message
const createPaymentService = new CreatePaymentUseCase(DeliverMessagetoQueue, sendDataService);
export const createPaymentController = new CreatePaymentController(createPaymentService)




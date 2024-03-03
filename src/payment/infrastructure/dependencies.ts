//Tech
import { AMQPLibRepository } from "../../shared/broker/infrastructure/Repository/AmqplibRepository";
import { SocketIO } from "../../shared/websocket/infrastructure/Socket.io";

//payment
import { CreatePaymentController } from "./controllers/CreateSuccessfullPayment";
import { CreateApprovedPayment } from "../application/CreatePaymentUseCase";

//queue
import { deliverPaymenttoQueue } from "../../shared/broker/application/deliverPayment";
//notification
import { deliverPaymentMessage } from "../../shared/websocket/application/sendMessageUser";

const amqpLibRepository = new AMQPLibRepository();
const socketRepository = new SocketIO();

const DeliverPaymenttoQueue = new deliverPaymenttoQueue(amqpLibRepository);
const DeliverPaymentMessage = new deliverPaymentMessage(socketRepository);

const ApprovedPayment = new CreateApprovedPayment(DeliverPaymenttoQueue, DeliverPaymentMessage);

export const approvedPaymentController = new CreatePaymentController(ApprovedPayment);

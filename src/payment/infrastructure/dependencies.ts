import { CreatePaymentUseCase } from "../application/CreatePaymentUseCase";
import { CreatePaymentController } from "./controllers/CreatePaymentController";
import { AMQPMessageQueueService } from "./Adapters/AmqpQueueService";

import { PaymentRepositoryImpl } from "../domain/PaymentRepository";
const paymentRepository = new PaymentRepositoryImpl();

export const amqpPaymentQueueService = new AMQPMessageQueueService("amqp://localhost:5672");
export const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository, amqpPaymentQueueService);
export const createPaymentController = new CreatePaymentController(createPaymentUseCase);



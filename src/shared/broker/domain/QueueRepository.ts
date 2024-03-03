import { Payment } from "../../../payment/domain/payment";

export interface QueueRepository {
  connectionBroker(): Promise<any>;
  createChannel(): Promise<any>;
  sendPaymentToQueue(order: Payment): Promise<void>;
  consumePayment(): Promise<any>;
}
import { Payment } from "./Payment";

export interface PaymentQueueService {
  sendPayment(queueName: string, payment: Payment): Promise<void>;
  consumePayment(queueName: string, onPaymentReceived: (payment: Payment) => void): Promise<void>;
}

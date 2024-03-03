import { deliverPaymentMessage } from "../../shared/websocket/application/sendMessageUser";
import { deliverPaymenttoQueue } from "../../shared/broker/application/deliverPayment";
import { Payment } from "../domain/payment";

export class CreateApprovedPayment {
  constructor(
    private readonly deliverPaymenttoQueue: deliverPaymenttoQueue,
    private readonly deliverPaymenttoClient: deliverPaymentMessage
  ) {}
  async run(completedPayment: Payment): Promise<Payment> {
    try {
      console.log(completedPayment);
      const approvedPayment: Payment = {
        name: completedPayment.name,
        concept: completedPayment.concept,
        total: completedPayment.total
      };
      await this.deliverPaymenttoQueue.run(approvedPayment);
      await this.deliverPaymenttoClient.run(approvedPayment);
      return approvedPayment;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
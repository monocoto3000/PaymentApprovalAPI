import { EventRepository } from "../domain/EventRepostiory";
import { Payment } from "../../../payment/domain/payment";

export class deliverPaymentMessage {
    constructor(private readonly websocketRepository: EventRepository) {}
    async run(payment: Payment) {
      try {
        console.log(payment)
        await this.websocketRepository.deliverData(payment);
      } catch (err: any) {
        console.log(err)
        throw new Error(err);
      }
    }
  }
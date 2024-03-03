import { QueueRepository } from "../domain/QueueRepository";
import { Payment } from "../../../payment/domain/Payment";

export class deliverPaymenttoQueue {
    constructor(private readonly queueRepository: QueueRepository) {}
    async run(data: Payment) {
      try {
        this.queueRepository.sendPaymentToQueue(data);
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }
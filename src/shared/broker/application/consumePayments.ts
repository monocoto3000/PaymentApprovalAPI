import { QueueRepository } from "../domain/QueueRepository";

export class ConsumePayment {
  constructor(private readonly queueRepository: QueueRepository) {}
  async run() {
    try {
      const payment = await this.queueRepository.consumePayment();
      return payment;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
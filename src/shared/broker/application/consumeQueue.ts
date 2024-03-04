import { QueueName } from "../domain/entities";
import { BrokerRepository } from "../domain/repository/BrokerRepository";

export class consumeQueue {
  constructor(private readonly brokerRepository: BrokerRepository) {}
  async run(queueName: QueueName): Promise<any> {
    try {
      const message = await this.brokerRepository.consumeQueue(queueName);
      console.log(message)
      return message;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

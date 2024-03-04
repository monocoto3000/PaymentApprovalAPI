import { QueueContent, QueueName, QueueRequest } from "../domain/entities";
import { BrokerRepository } from "../domain/repository/BrokerRepository";

export class deliverMessagetoQueue {
  constructor(private readonly brokerRepository: BrokerRepository) {}
  async run(data: QueueContent, queueName: QueueName) {
    try {
      const ApprovedPayment: QueueRequest = {
        queueName: queueName,
        content: data
      };
      console.log(ApprovedPayment)
      await this.brokerRepository.sendMessageToChannel(ApprovedPayment);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

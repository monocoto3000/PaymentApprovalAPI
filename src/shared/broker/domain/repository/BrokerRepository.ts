import { QueueName, QueueRequest } from "../entities/index";

export interface BrokerRepository {
  connectionBroker(): Promise<any>;
  createChannel(): Promise<any>;
  sendMessageToChannel(req: QueueRequest): Promise<void>;
  consumeQueue(queueName: QueueName): Promise<any>;
}

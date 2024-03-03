import { QueueRepository } from "../../domain/QueueRepository";
import { Payment } from "../../../../payment/domain/payment";
import { Queue } from "../../domain/Queue";
import { AMQPLibConnection } from "../AmqplibConnection";
import { AMQPLibChannel } from "../AmqplibChannel";

export class AMQPLibRepository implements QueueRepository {
  async connectionBroker(): Promise<any> {
    return AMQPLibConnection.connect();
  }

  async createChannel(): Promise<any> {
    const connection = await this.connectionBroker();
    return AMQPLibChannel.create(connection);
  }

  async sendPaymentToQueue(payment: Payment): Promise<void> {
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(Queue.queueName, {
        durable: false,
      });
      channel.sendToQueue(Queue.queueName, Buffer.from(JSON.stringify(payment)));
      console.log('Pago enviado: ' + payment);
      await channel.close();
    } catch (error) {
      throw new Error(error);
    }
  }

  async consumePayment(): Promise<any> {
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(Queue.queueNameConsume, {
        durable: false,
      });
      return new Promise<Payment>((resolveConsume, rejectConsume) => {
        channel.consume(Queue.queueNameConsume, async (message: { content: { toString: () => string; }; } | null) => {
          if (message !== null) {
            const data = JSON.parse(message.content.toString());
            await channel.ack(message);
            console.log('Pago consumido: ' + data);
            resolveConsume(data.body);
          }
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

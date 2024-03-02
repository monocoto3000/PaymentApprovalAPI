import * as amqp from 'amqplib';
import { Payment } from '../../domain/Payment';
import { PaymentQueueService } from '../../domain/PaymentQueue';

export class AMQPMessageQueueService implements PaymentQueueService {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;
  constructor(private readonly url: string) {}
  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Error de conexión a RabbitMQ:', error);
      throw error;
    }
  }
  async sendPayment(queueName: string, payment: Payment): Promise<void> {
    try {
      await this.channel.assertQueue(queueName, { durable: false });
      this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payment)));
    } catch (error) {
      console.error('Error al enviar el mensaje a la cola', error);
      throw error;
    }
  }
  async close(): Promise<void> {
    try {
      await this.channel.close();
      await this.connection.close();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  async consumePayment(queueName: string, onPaymentReceived: (payment: Payment) => void): Promise<void> {
    if (!this.channel) {
      throw new Error('Canal no inicializado');
    }
    try {
      await this.channel.assertQueue(queueName, { durable: false });
      await this.channel.consume(queueName, (msg) => {
        if (msg !== null) {
          const payment: Payment = JSON.parse(msg.content.toString());
          onPaymentReceived(payment);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('Error de consumo de mensajes de la cola', error);
      throw error;
    }
  }
}

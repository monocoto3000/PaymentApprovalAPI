import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/PaymentRepository";
import { AMQPMessageQueueService } from "../infrastructure/Adapters/AmqpQueueService";

export class CreatePaymentUseCase {
  constructor(
    private readonly PaymentRepository: PaymentRepository,
    private readonly PaymentQueueService: AMQPMessageQueueService 
  ) {}

  async run(
    name: string,
    concept: string,
    total: number,
  ): Promise<Payment | null> {
    try {
      const Payment = await this.PaymentRepository.createPayment(
        name,
        concept,
        total
      );
      if (Payment) {
        await this.PaymentQueueService.connect();
        await this.PaymentQueueService.sendPayment('completedPayments', Payment);
        await this.PaymentQueueService.close();
      }
      return Payment;
    } catch (error) {
      return null;
    }
  }
}

import { Payment } from "./Payment";

export interface PaymentRepository {
  createPayment(
    name: string,
    concept: string,
    total: number
  ): Promise<Payment | null>;
}

export class PaymentRepositoryImpl implements PaymentRepository {
  async createPayment(
    name: string,
    concept: string,
    total: number
  ): Promise<Payment | null> {
    return new Payment(1, name, concept, total, new Date().toISOString());
  }
}

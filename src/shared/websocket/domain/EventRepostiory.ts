import { Payment } from "../../../payment/domain/Payment";

export interface EventRepository {
  connect(): Promise<any>;
  deliverData(payment: Payment): Promise<void>;
}
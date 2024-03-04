import { deliverMessagetoQueue } from "../../shared/broker/application/deliverMessage";
import { QueueName } from "../../shared/broker/domain/entities";
import { deliverDatatoClient } from "../../shared/socket/application/deliverDatatoClientUseCase";
import { EventsSocket } from "../../shared/socket/domain/entities/Events";

export class CreatePaymentUseCase {
  constructor(
    private readonly deliverMessagetoQueue: deliverMessagetoQueue,
    private readonly deliverMessagetoClient: deliverDatatoClient
  ) {}
  async run(payment: any): Promise<void> {
    try {
      const Approvedpayment = {
        message: `Orden de ${payment?.name} bajo el concepto  ${payment?.concept} fue solicitada con un total de: ${payment?.total}`,
        ...payment,
      };
      await this.deliverMessagetoQueue.run(Approvedpayment, QueueName.approved_payments);
      await this.deliverMessagetoClient.run(EventsSocket.deliverData, Approvedpayment);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}

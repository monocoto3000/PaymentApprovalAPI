import { Response, Request } from "express";
import { CreateApprovedPayment } from "../../application/CreatePaymentUseCase";

export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreateApprovedPayment) {}
  async run(req: Request, res: Response) {
    try {
      const payment = req.body;
      if (payment === null) res.status(404).send("Solicitud de pago no encontrado");
      await this.createPaymentService.run(payment);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
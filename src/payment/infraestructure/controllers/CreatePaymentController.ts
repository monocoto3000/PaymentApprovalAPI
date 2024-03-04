import { Response, Request } from "express";
import { CreatePaymentUseCase } from "../../application/createPaymentUseCase";

export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreatePaymentUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const order = req.body;
      if (order === null) res.status(404).send("not found");
      await this.createPaymentService.run(order);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}

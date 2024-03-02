import { Request, Response } from "express";
import { CreatePaymentUseCase } from "../../application/CreatePaymentUseCase";
import express from "express";
const app = express();

export class CreatePaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase
  ) { }
  async run(req: Request, res: Response) {
    app.post("/payments", async (req, res) => {
      try {
        const paymentData = req.body;
        const Payment = await this.createPaymentUseCase.run(
          paymentData.name,
          paymentData.concept,
          paymentData.total
        );
        if (Payment) {
          res.status(201).send({
            status: "success",
            data: {
              id: Payment?.id,
              username: Payment?.name,
              content: Payment?.concept,
              total: Payment?.total,
              date: Payment?.paydate
            },
          });
        }
        res.status(200).json({ status: "success", message: "Pago recibido correctamente" });
      } catch (error) {
        console.error("Error al procesar el pago:", error);
        res.status(500).json({ status: "error", message: "Error al procesar el pago" });
      }
    });
  }
}


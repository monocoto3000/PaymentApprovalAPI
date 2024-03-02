import express from "express";

import { createPaymentController } from "./dependencies";

export const PaymentRouter = express.Router();

PaymentRouter.post(
  "/",
  createPaymentController.run.bind(createPaymentController)
);




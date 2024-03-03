import { Router } from "express";
import { approvedPaymentController } from "./dependencies";

const paymentRouter = Router()

paymentRouter.post("/", approvedPaymentController.run.bind(approvedPaymentController))
export default paymentRouter;
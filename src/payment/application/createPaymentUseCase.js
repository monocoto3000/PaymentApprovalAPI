"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentUseCase = void 0;
const entities_1 = require("../../shared/broker/domain/entities");
const Events_1 = require("../../shared/socket/domain/entities/Events");
class CreatePaymentUseCase {
    constructor(deliverMessagetoQueue, deliverMessagetoClient) {
        this.deliverMessagetoQueue = deliverMessagetoQueue;
        this.deliverMessagetoClient = deliverMessagetoClient;
    }
    run(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Approvedpayment = Object.assign({ message: `Orden de ${payment === null || payment === void 0 ? void 0 : payment.name} bajo el concepto  ${payment === null || payment === void 0 ? void 0 : payment.concept} fue solicitada con un total de: ${payment === null || payment === void 0 ? void 0 : payment.total}` }, payment);
                yield this.deliverMessagetoQueue.run(Approvedpayment, entities_1.QueueName.approved_payments);
                yield this.deliverMessagetoClient.run(Events_1.EventsSocket.deliverData, Approvedpayment);
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
}
exports.CreatePaymentUseCase = CreatePaymentUseCase;

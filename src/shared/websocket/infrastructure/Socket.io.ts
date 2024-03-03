import { Socket, io } from "socket.io-client";
import { Payment } from "../../../payment/domain/payment";
import { EventRepository } from "../domain/EventRepostiory";
import { Events } from "../domain/Events";

export class SocketIO implements EventRepository {
    async connect() {
      return new Promise<Socket>((resolve, reject) => {
        try {
          const socket = io(Events.url);
          resolve(socket);
        } catch (err: any) {
          reject(err);
        }
      });
    }
    async deliverData(payment: Payment) {
      try {
        const socket = await this.connect();
        console.log("Order enviada:" + payment);
        socket.emit(Events.deliver_data, payment);
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }
import { Socket, io } from "socket.io-client";
import { EventsSocket } from "../domain/entities/Events";
import { SocketRepository } from "../domain/repositories/socketRepository";
import { QueueContent } from "../../broker/domain/entities";

export class SocketIO implements SocketRepository {
  constructor(private readonly url: string) {}
  async connect() {
    return new Promise<Socket>((resolve, reject) => {
      try {
        const socket = io(this.url);
        resolve(socket);
      } catch (err: any) {
        reject(err);
      }
    });
  }
  async sendData(eventEmit: EventsSocket, data: QueueContent) {
    try {
      const socket = await this.connect();
      console.log(data)
      socket.emit(eventEmit, data);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

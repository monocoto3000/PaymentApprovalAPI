import { QueueContent } from "../../broker/domain/entities";
import { EventsSocket } from "../domain/entities/Events";
import { SocketRepository } from "../domain/repositories/socketRepository";

export class deliverDatatoClient {
  constructor(private readonly socketRepository: SocketRepository) {}
  async run(eventEmit: EventsSocket, data: QueueContent) {
    try {
      await this.socketRepository.sendData(eventEmit, data);
      console.log("Mensaje enviado correctamente");
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

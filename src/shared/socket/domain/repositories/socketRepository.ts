import { QueueContent } from "../../../broker/domain/entities";
import { EventsSocket } from "../entities/Events";

export interface SocketRepository {
  connect(): Promise<any>;
  sendData(eventEmit: EventsSocket , data : QueueContent): Promise<void>;
}

import amqp, { Connection } from "amqplib/callback_api";
import { Queue } from "../domain/Queue";

export class AMQPLibConnection {
  static connect(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
      amqp.connect(Queue.url, (err: any, connection: Connection) => {
        if (err) {
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });
  }
}

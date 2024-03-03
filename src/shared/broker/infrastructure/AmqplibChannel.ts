import { Channel, Connection } from "amqplib/callback_api";

export class AMQPLibChannel {
  static create(connection: Connection): Promise<Channel> {
    return new Promise<Channel>((resolve, reject) => {
      connection.createChannel((err: any, channel: Channel) => {
        if (err) {
          reject(err);
        } else {
          resolve(channel);
        }
      });
    });
  }
}

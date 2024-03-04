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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amqplib = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
class Amqplib {
    constructor(url) {
        this.url = url;
    }
    connectionBroker() {
        return new Promise((resolve, reject) => {
            callback_api_1.default.connect(this.url, (err, conn) => {
                if (err)
                    reject(err);
                console.log("Successfully connected");
                resolve(conn);
            });
        });
    }
    createChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield this.connectionBroker();
                return new Promise((resolve, reject) => {
                    conn.createChannel((errChanel, channel) => {
                        if (errChanel)
                            reject(errChanel);
                        resolve(channel);
                    });
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    sendMessageToChannel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { queueName, content } = req;
            try {
                const channel = yield this.createChannel();
                yield channel.assertQueue(queueName);
                channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)), {
                    persistent: true,
                });
                console.log("Mensaje enviado: " + content);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    consumeQueue(queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield this.createChannel();
                yield channel.assertQueue(queueName);
                return new Promise((resolve, reject) => {
                    channel.consume(queueName, (data) => __awaiter(this, void 0, void 0, function* () {
                        console.log(`Nombre de queue consumida: ${queueName} Datos de la queue: `);
                        if (data !== null) {
                            const content = data === null || data === void 0 ? void 0 : data.content;
                            const parsedContent = JSON.parse(content.toString());
                            yield channel.ack(data);
                            resolve(parsedContent);
                        }
                        reject("Datos invalidos: " + data);
                    }));
                });
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.Amqplib = Amqplib;

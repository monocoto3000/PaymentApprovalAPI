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
exports.SocketIO = void 0;
const socket_io_client_1 = require("socket.io-client");
class SocketIO {
    constructor(url) {
        this.url = url;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    const socket = (0, socket_io_client_1.io)(this.url);
                    resolve(socket);
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
    sendData(eventEmit, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const socket = yield this.connect();
                console.log(data);
                socket.emit(eventEmit, data);
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.SocketIO = SocketIO;

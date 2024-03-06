import { SocketService } from "./socket-service.module.js";

const socketService = new SocketService();

export { socketService };
export { SocketEvent, SocketNamespace } from "./libs/enums/enums.js";
export { type SocketService } from "./socket-service.module.js";

import { config } from "~/libs/modules/config/config.js";

import { Socket } from "./socket.module.js";

const socket = new Socket(config.ENV.API.SOCKET_SERVER_URL);

export { socket };
export { SocketEvent, SocketNamespace } from "./libs/enums/enums.js";

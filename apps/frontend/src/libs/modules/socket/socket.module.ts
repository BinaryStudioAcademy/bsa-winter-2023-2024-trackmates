import { type Socket as TSocket, io } from "socket.io-client";

import { type ValueOf } from "~/libs/types/types.js";

import { type SocketNamespace } from "./libs/enums/enums.js";

class Socket {
	private baseUrl: string;

	public constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	public getInstance(namespace: ValueOf<typeof SocketNamespace>): TSocket {
		return io(`${this.baseUrl}${namespace}`, {
			transports: ["websocket"],
		});
	}
}

export { Socket };

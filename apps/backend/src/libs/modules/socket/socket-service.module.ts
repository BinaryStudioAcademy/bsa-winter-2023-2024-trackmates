import { type Server as HttpServer } from "node:http";
import { type Socket, Server as SocketServer } from "socket.io";

import { SocketEvent, SocketNamespace } from "~/libs/modules/socket/socket.js";
import { type ValueOf } from "~/libs/types/types.js";

class SocketService {
	private io!: SocketServer;

	private chatMessageHandler(socket: Socket): void {
		socket.on(SocketEvent.CHAT_JOIN_ROOM, (userId: string) => {
			void socket.join(userId);
		});

		socket.on(SocketEvent.CHAT_LEAVE_ROOM, (userId: string) => {
			void socket.leave(userId);
		});
	}

	private notificationHandler(socket: Socket): void {
		socket.on(SocketEvent.NOTIFICATIONS_JOIN_ROOM, (userId: string) => {
			void socket.join(userId);
		});

		socket.on(SocketEvent.NOTIFICATIONS_LEAVE_ROOM, (userId: string) => {
			void socket.leave(userId);
		});
	}

	public emitMessage<T>({
		event,
		payload,
		receiversIds,
		targetNamespace,
	}: {
		event: ValueOf<typeof SocketEvent>;
		payload: T;
		receiversIds: string[];
		targetNamespace: ValueOf<typeof SocketNamespace>;
	}): void {
		this.io.of(targetNamespace).to(receiversIds).emit(event, payload);
	}

	public initialize(server: HttpServer): void {
		this.io = new SocketServer(server);
		this.io
			.of(SocketNamespace.CHAT)
			.on(SocketEvent.CONNECTION, this.chatMessageHandler.bind(this));
		this.io
			.of(SocketNamespace.NOTIFICATIONS)
			.on(SocketEvent.CONNECTION, this.notificationHandler.bind(this));
	}
}

export { SocketService };

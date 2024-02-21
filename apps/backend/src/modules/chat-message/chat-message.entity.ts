import { type Entity, type ValueOf } from "~/libs/types/types.js";

import { type UserEntity } from "../users/users.js";
import { MessageStatus } from "./libs/enums/enums.js";
import { type MessageResponseDto } from "./libs/types/types.js";

class ChatMessageEntity implements Entity {
	private chatId: null | string;

	private createdAt: string;

	private id: null | number;

	private message: string;

	private receiverUser: UserEntity;

	private senderUser: UserEntity;

	private status: ValueOf<typeof MessageStatus>;

	private updatedAt: string;

	private constructor({
		chatId,
		createdAt,
		id,
		message,
		receiverUser,
		senderUser,
		status,
		updatedAt,
	}: {
		chatId: null | string;
		createdAt: string;
		id: null | number;
		message: string;
		receiverUser: UserEntity;
		senderUser: UserEntity;
		status: ValueOf<typeof MessageStatus>;
		updatedAt: string;
	}) {
		this.chatId = chatId;
		this.createdAt = createdAt;
		this.id = id;
		this.receiverUser = receiverUser;
		this.message = message;
		this.senderUser = senderUser;
		this.status = status;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		chatId,
		createdAt,
		id,
		message,
		receiverUser,
		senderUser,
		status,
		updatedAt,
	}: {
		chatId: string;
		createdAt: string;
		id: number;
		message: string;
		receiverUser: UserEntity;
		senderUser: UserEntity;
		status: ValueOf<typeof MessageStatus>;
		updatedAt: string;
	}): ChatMessageEntity {
		return new ChatMessageEntity({
			chatId,
			createdAt,
			id,
			message,
			receiverUser,
			senderUser,
			status,
			updatedAt,
		});
	}

	public static initializeNew({
		chatId,
		message,
		receiverUser,
		senderUser,
	}: {
		chatId: null | string;
		message: string;
		receiverUser: UserEntity;
		senderUser: UserEntity;
	}): ChatMessageEntity {
		return new ChatMessageEntity({
			chatId,
			createdAt: "",
			id: null,
			message,
			receiverUser,
			senderUser,
			status: MessageStatus.UNREAD,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		chatId: null | string;
		message: string;
		receiverUser: UserEntity;
		senderUser: UserEntity;
	} {
		return {
			chatId: this.chatId,
			message: this.message,
			receiverUser: this.receiverUser,
			senderUser: this.senderUser,
		};
	}

	public toObject(): MessageResponseDto {
		return {
			chatId: this.chatId as string,
			createdAt: this.createdAt,
			id: this.id as number,
			message: this.message,
			receiverUser: this.receiverUser.toObject(),
			senderUser: this.senderUser.toObject(),
			status: this.status,
			updatedAt: this.updatedAt,
		};
	}
}

export { ChatMessageEntity };

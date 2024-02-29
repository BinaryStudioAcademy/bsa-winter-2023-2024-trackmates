import { type Entity, type ValueOf } from "~/libs/types/types.js";
import { type UserEntity } from "~/modules/users/users.js";

import { MessageStatus } from "./libs/enums/enums.js";
import { type ChatMessageItemResponseDto } from "./libs/types/types.js";

type Constructor = {
	chatId: number;
	createdAt: string;
	id: null | number;
	senderUser: UserEntity;
	status: ValueOf<typeof MessageStatus>;
	text: string;
	updatedAt: string;
};

class ChatMessageEntity implements Entity {
	private chatId: number;

	private createdAt: string;

	private id: null | number;

	private senderUser: UserEntity;

	private status: ValueOf<typeof MessageStatus>;

	private text: string;

	private updatedAt: string;

	private constructor({
		chatId,
		createdAt,
		id,
		senderUser,
		status,
		text,
		updatedAt,
	}: Constructor) {
		this.chatId = chatId;
		this.createdAt = createdAt;
		this.id = id;
		this.senderUser = senderUser;
		this.status = status;
		this.text = text;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		chatId,
		createdAt,
		id,
		senderUser,
		status,
		text,
		updatedAt,
	}: {
		chatId: number;
		createdAt: string;
		id: number;
		senderUser: UserEntity;
		status: ValueOf<typeof MessageStatus>;
		text: string;
		updatedAt: string;
	}): ChatMessageEntity {
		return new ChatMessageEntity({
			chatId,
			createdAt,
			id,
			senderUser,
			status,
			text,
			updatedAt,
		});
	}

	public static initializeNew({
		chatId,
		senderUser,
		text,
	}: {
		chatId: number;
		senderUser: UserEntity;
		text: string;
	}): ChatMessageEntity {
		return new ChatMessageEntity({
			chatId,
			createdAt: "",
			id: null,
			senderUser,
			status: MessageStatus.UNREAD,
			text,
			updatedAt: "",
		});
	}

	public toNewObject(): {
		chatId: number;
		senderUserId: number;
		text: string;
	} {
		const { id: senderUserId } = this.senderUser.toObject();

		return {
			chatId: this.chatId,
			senderUserId,
			text: this.text,
		};
	}

	public toObject(): ChatMessageItemResponseDto {
		return {
			chatId: this.chatId,
			createdAt: this.createdAt,
			id: this.id as number,
			senderUser: this.senderUser.toObject(),
			status: this.status,
			text: this.text,
			updatedAt: this.updatedAt,
		};
	}
}

export { ChatMessageEntity };

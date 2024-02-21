import { type Entity } from "~/libs/types/types.js";

import { UserEntity } from "../users/users.js";
import { type ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatItemResponseDto } from "./libs/types/types.js";

class ChatEntity implements Entity {
	private id: string;
	private interlocutor: UserEntity;
	private lastMessage: ChatMessageEntity;
	private unreadMessageCount: number;

	private constructor({
		id,
		interlocutor,
		lastMessage,
		unreadMessageCount,
	}: {
		id: string;
		interlocutor: UserEntity;
		lastMessage: ChatMessageEntity;
		unreadMessageCount: number;
	}) {
		this.id = id;
		this.lastMessage = lastMessage;
		this.interlocutor = interlocutor;
		this.unreadMessageCount = unreadMessageCount;
	}

	public static initialize({
		id,
		interlocutor,
		lastMessage,
		unreadMessageCount,
	}: {
		id: string;
		interlocutor: UserEntity;
		lastMessage: ChatMessageEntity;
		unreadMessageCount: number;
	}): ChatEntity {
		return new ChatEntity({
			id,
			interlocutor,
			lastMessage,
			unreadMessageCount,
		});
	}

	public static initializeNew({
		id,
		interlocutor,
		lastMessage,
		unreadMessageCount,
	}: {
		id: string;
		interlocutor: UserEntity;
		lastMessage: ChatMessageEntity;
		unreadMessageCount: number;
	}): ChatEntity {
		return this.initialize({
			id,
			interlocutor,
			lastMessage,
			unreadMessageCount,
		});
	}

	public toNewObject(): {
		id: string;
		interlocutor: UserEntity;
		lastMessage: ChatMessageEntity;
		unreadMessageCount: number;
	} {
		return {
			id: this.id,
			interlocutor: this.interlocutor,
			lastMessage: this.lastMessage,
			unreadMessageCount: this.unreadMessageCount,
		};
	}

	public toObject(): ChatItemResponseDto {
		return {
			id: this.id,
			interlocutor: this.interlocutor.toObject(),
			lastMessage: this.lastMessage.toObject(),
			unreadMessageCount: this.unreadMessageCount,
		};
	}
}

export { ChatEntity };

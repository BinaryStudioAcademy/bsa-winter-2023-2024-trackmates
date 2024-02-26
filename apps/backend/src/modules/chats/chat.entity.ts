import { type Entity } from "~/libs/types/types.js";
import { type ChatMessageEntity } from "~/modules/chat-messages/chat-message.js";
import { type UserEntity } from "~/modules/users/users.js";

import {
	type ChatGetAllItemResponseDto,
	type ChatResponseDto,
	type ChatSingleItemResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	createdAt: string;
	firstUser: UserEntity;
	id: null | number;
	lastMessage: ChatMessageEntity | null;
	messages: ChatMessageEntity[] | null;
	secondUser: UserEntity;
	unreadMessageCount: null | number;
	updatedAt: string;
};

class ChatEntity implements Entity {
	private createdAt: string;
	private firstUser: UserEntity;
	private id: null | number;
	private lastMessage: ChatMessageEntity | null;
	private messages: ChatMessageEntity[] | null;
	private secondUser: UserEntity;
	private unreadMessageCount: null | number;
	private updatedAt: string;

	private constructor({
		createdAt,
		firstUser,
		id,
		lastMessage,
		messages,
		secondUser,
		unreadMessageCount,
		updatedAt,
	}: Constructor) {
		this.createdAt = createdAt;
		this.id = id;
		this.firstUser = firstUser;
		this.messages = messages;
		this.secondUser = secondUser;
		this.lastMessage = lastMessage;
		this.unreadMessageCount = unreadMessageCount;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		firstUser,
		id,
		secondUser,
		updatedAt,
	}: {
		createdAt: string;
		firstUser: UserEntity;
		id: number;
		secondUser: UserEntity;
		updatedAt: string;
	}) {
		return new ChatEntity({
			createdAt,
			firstUser,
			id,
			lastMessage: null,
			messages: null,
			secondUser,
			unreadMessageCount: null,
			updatedAt,
		});
	}
	public static initializeNew({
		firstUser,
		secondUser,
	}: {
		firstUser: UserEntity;
		secondUser: UserEntity;
	}) {
		return new ChatEntity({
			createdAt: "",
			firstUser,
			id: null,
			lastMessage: null,
			messages: null,
			secondUser,
			unreadMessageCount: null,
			updatedAt: "",
		});
	}

	public static initializeWithLastMessage({
		createdAt,
		firstUser,
		id,
		lastMessage,
		secondUser,
		unreadMessageCount,
		updatedAt,
	}: {
		createdAt: string;
		firstUser: UserEntity;
		id: number;
		lastMessage: ChatMessageEntity;
		secondUser: UserEntity;
		unreadMessageCount: number;
		updatedAt: string;
	}) {
		return new ChatEntity({
			createdAt,
			firstUser,
			id,
			lastMessage,
			messages: null,
			secondUser,
			unreadMessageCount,
			updatedAt,
		});
	}

	public static initializeWithMessages({
		createdAt,
		firstUser,
		id,
		messages,
		secondUser,
		updatedAt,
	}: {
		createdAt: string;
		firstUser: UserEntity;
		id: number;
		messages: ChatMessageEntity[];
		secondUser: UserEntity;
		updatedAt: string;
	}) {
		return new ChatEntity({
			createdAt,
			firstUser,
			id,
			lastMessage: null,
			messages,
			secondUser,
			unreadMessageCount: null,
			updatedAt,
		});
	}

	toNewObject(): { firstUserId: number; secondUserId: number } {
		const { id: firstUserId } = this.firstUser.toObject();
		const { id: secondUserId } = this.secondUser.toObject();
		return {
			firstUserId,
			secondUserId,
		};
	}

	toObject(): ChatResponseDto {
		return {
			createdAt: this.createdAt,
			firstUser: this.firstUser.toObject(),
			id: this.id as number,
			secondUser: this.secondUser.toObject(),
			updatedAt: this.updatedAt,
		};
	}

	toObjectWithLastMessage(userId: number): ChatGetAllItemResponseDto {
		const firstUser = this.firstUser.toObject();
		const secondUser = this.secondUser.toObject();
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			interlocutor: firstUser.id === userId ? secondUser : firstUser,
			lastMessage: (this.lastMessage as ChatMessageEntity).toObject(),
			unreadMessageCount: this.unreadMessageCount as number,
			updatedAt: this.updatedAt,
		};
	}

	toObjectWithMessages(userId: number): ChatSingleItemResponseDto {
		const firstUser = this.firstUser.toObject();
		const secondUser = this.secondUser.toObject();
		const messages = (this.messages as ChatMessageEntity[]).map((message) =>
			message.toObject(),
		);
		return {
			id: this.id as number,
			interlocutor: firstUser.id === userId ? secondUser : firstUser,
			messages,
		};
	}
}

export { ChatEntity };

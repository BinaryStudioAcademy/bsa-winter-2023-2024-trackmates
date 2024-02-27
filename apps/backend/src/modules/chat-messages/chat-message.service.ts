import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ChatService } from "~/modules/chats/chats.js";
import { type UserEntity, type UserRepository } from "~/modules/users/users.js";

import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageModel } from "./chat-message.model.js";
import { type ChatMessageRepository } from "./chat-message.repository.js";
import {
	type ChatMessageCreateRequestDto,
	type ChatMessageItemResponseDto,
	type ChatMessageUpdateRequestDto,
} from "./libs/types/types.js";

class ChatMessageService implements Service {
	private chatMessageRepository: ChatMessageRepository;

	private chatService: ChatService;

	private userRepository: UserRepository;

	public constructor({
		chatMessageRepository,
		chatService,
		userRepository,
	}: {
		chatMessageRepository: ChatMessageRepository;
		chatService: ChatService;
		userRepository: UserRepository;
	}) {
		this.chatMessageRepository = chatMessageRepository;
		this.chatService = chatService;
		this.userRepository = userRepository;
	}

	public async create({
		messageData,
		userId,
	}: {
		messageData: ChatMessageCreateRequestDto;
		userId: number;
	}): Promise<ChatMessageItemResponseDto> {
		const senderUser = await this.userRepository.findById(userId);

		if (!senderUser) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const {
			firstUser,
			id: chatId,
			secondUser,
		} = await this.chatService.find(messageData.chatId);

		if (userId !== firstUser.id && userId !== secondUser.id) {
			throw new HTTPError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		const createMessage = await this.chatMessageRepository.create(
			ChatMessageEntity.initializeNew({
				chatId,
				senderUser,
				text: messageData.text,
			}),
		);

		return createMessage.toObject();
	}

	public delete(): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	public async find(id: number): Promise<ChatMessageItemResponseDto> {
		const messageById = await this.chatMessageRepository.find(id);

		if (!messageById) {
			throw new HTTPError({
				message: ExceptionMessage.MESSAGE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return messageById.toObject();
	}

	public findAll(): Promise<{ items: ChatMessageModel[] }> {
		throw new Error("Method not implemented");
	}

	public async update(
		id: number,
		{
			updateMessageData,
			userId,
		}: { updateMessageData: ChatMessageUpdateRequestDto; userId: number },
	): Promise<ChatMessageItemResponseDto> {
		const messageById = await this.find(id);

		if (userId !== messageById.senderUser.id) {
			throw new HTTPError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		const senderUser = await this.userRepository.findById(
			messageById.senderUser.id,
		);

		const updatedMessage = await this.chatMessageRepository.update(
			id,
			ChatMessageEntity.initializeNew({
				chatId: messageById.chatId,
				senderUser: senderUser as UserEntity,
				text: updateMessageData.text,
			}),
		);

		return updatedMessage.toObject();
	}
}

export { ChatMessageService };
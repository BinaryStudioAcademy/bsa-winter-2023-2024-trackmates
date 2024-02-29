import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { type Service } from "~/libs/types/types.js";
import { ChatError, type ChatService } from "~/modules/chats/chats.js";
import { type UserEntity, type UserRepository } from "~/modules/users/users.js";

import { ChatMessageEntity } from "./chat-message.entity.js";
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
			throw new ChatError({
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
			throw new ChatError({
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

	public async delete(id: number): Promise<boolean> {
		const messageById = await this.chatMessageRepository.find(id);

		if (!messageById) {
			throw new ChatError({
				message: ExceptionMessage.MESSAGE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.chatMessageRepository.delete(id);
	}

	public async find(id: number): Promise<ChatMessageItemResponseDto> {
		const messageById = await this.chatMessageRepository.find(id);

		if (!messageById) {
			throw new ChatError({
				message: ExceptionMessage.MESSAGE_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return messageById.toObject();
	}

	public async findAll(
		userId: number,
	): Promise<{ items: ChatMessageItemResponseDto[] }> {
		const messagesByUserId = await this.chatMessageRepository.findAll(userId);

		return {
			items: messagesByUserId.map((messageByUserId) => {
				return messageByUserId.toObject();
			}),
		};
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
			throw new ChatError({
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

import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { type ChatService } from "~/modules/chats/chats.js";
import { type UserRepository } from "~/modules/users/users.js";

import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageModel } from "./chat-message.model.js";
import { type ChatMessageRepository } from "./chat-message.repository.js";
import {
	type ChatMessageCreateRequestDto,
	type ChatMessageItemResponseDto,
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
	public find(): Promise<ChatMessageModel | null> {
		throw new Error("Method not implemented");
	}
	public findAll(): Promise<{ items: ChatMessageModel[] }> {
		throw new Error("Method not implemented");
	}
	public update(): Promise<ChatMessageModel> {
		throw new Error("Method not implemented.");
	}
}

export { ChatMessageService };

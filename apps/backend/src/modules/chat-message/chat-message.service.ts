import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import { HTTPError } from "~/libs/modules/http/http.js";

import { type UserRepository } from "../users/users.js";
import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageRepository } from "./chat-message.repository.js";
import { EMPTY_CHAT_LENGTH } from "./libs/constants/chat-message.constants.js";
import {
	type ChatGetAllResponseDto,
	type MessageGetAllResponseDto,
	type MessageResponseDto,
	type MessageSendRequestDto,
} from "./libs/types/types.js";

class ChatMessageService {
	private chatMessageRepository: ChatMessageRepository;
	private userRepository: UserRepository;

	constructor(
		chatMessageRepository: ChatMessageRepository,
		userRepository: UserRepository,
	) {
		this.chatMessageRepository = chatMessageRepository;
		this.userRepository = userRepository;
	}

	public async findAllChatsByUserId(
		userId: number,
	): Promise<ChatGetAllResponseDto> {
		const chats = await this.chatMessageRepository.findAllChatsByUserId(userId);
		return {
			items: chats.map((chat) => chat.toObject()),
		};
	}

	public async findAllMessagesByChatId(
		chatId: string,
		userId: number,
	): Promise<MessageGetAllResponseDto> {
		const userIsChatOwner =
			await this.chatMessageRepository.checkIfUserIsChatOwner(userId, chatId);

		if (!userIsChatOwner) {
			throw new HTTPError({
				message: ExceptionMessage.NO_PERMISSION,
				status: HTTPCode.FORBIDDEN,
			});
		}

		const chatMessages =
			await this.chatMessageRepository.findAllMessagesByChatId(chatId);

		if (chatMessages.length === EMPTY_CHAT_LENGTH) {
			throw new HTTPError({
				message: ExceptionMessage.CHAT_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		return {
			items: chatMessages.map((chatMessage) => chatMessage.toObject()),
		};
	}

	public async sendMessage(
		messagePayload: MessageSendRequestDto,
		senderId: number,
	): Promise<MessageResponseDto> {
		const { message, receiverId } = messagePayload;

		const chatId =
			await this.chatMessageRepository.getChatIdBySenderIdAndReceiverId(
				senderId,
				receiverId,
			);

		const senderUser = await this.userRepository.findById(senderId);
		const receiverUser = await this.userRepository.findById(receiverId);

		if (!senderUser || !receiverUser) {
			throw new HTTPError({
				message: ExceptionMessage.USER_NOT_FOUND,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const chatMessage = await this.chatMessageRepository.create(
			ChatMessageEntity.initializeNew({
				chatId,
				message,
				receiverUser,
				senderUser,
			}),
		);

		return chatMessage.toObject();
	}
}

export { ChatMessageService };

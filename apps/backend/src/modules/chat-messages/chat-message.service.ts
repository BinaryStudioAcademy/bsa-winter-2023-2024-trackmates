import { ExceptionMessage, HTTPCode } from "~/libs/enums/enums.js";
import {
	SocketEvent,
	SocketNamespace,
	socketService,
} from "~/libs/modules/socket/socket.js";
import { type Service } from "~/libs/types/types.js";
import { ChatError, type ChatService } from "~/modules/chats/chats.js";
import { type UserEntity, type UserRepository } from "~/modules/users/users.js";

import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageRepository } from "./chat-message.repository.js";
import { MessageStatus } from "./libs/enums/enums.js";
import {
	type ChatMessageCreateRequestDto,
	type ChatMessageItemResponseDto,
	type ChatMessageItemWithReceiverIdResponseDto,
	type ChatMessageUpdateRequestDto,
	type ReadChatMessagesResponseDto,
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
	}): Promise<ChatMessageItemWithReceiverIdResponseDto> {
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

		const createdMessage = await this.chatMessageRepository.create(
			ChatMessageEntity.initializeNew({
				chatId,
				senderUser,
				status: MessageStatus.UNREAD,
				text: messageData.text,
			}),
		);

		const chatMessage = createdMessage.toObject();

		return {
			chatMessage,
			receiverId:
				chatMessage.senderUser.id === firstUser.id
					? secondUser.id
					: firstUser.id,
		};
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

	public async setReadChatMessages(
		chatId: number,
		chatMessageIds: number[],
		userId: number,
	): Promise<ReadChatMessagesResponseDto> {
		const readChatMessages =
			await this.chatMessageRepository.setReadChatMessages(chatMessageIds);

		const unreadMessageCount = await this.chatService.getUnreadMessagesCount({
			chatId,
			userId,
		});

		const unreadMessageCountTotal =
			await this.chatService.getUnreadMessagesCountTotal(userId);

		const { firstUser, secondUser } = await this.chatService.find(chatId);
		const interlocutorId =
			firstUser.id === userId ? secondUser.id : firstUser.id;

		const interlocutorUnreadMessageCountTotal =
			await this.chatService.getUnreadMessagesCountTotal(interlocutorId);

		const interlocutorUnreadMessageCount =
			await this.chatService.getUnreadMessagesCount({
				chatId,
				userId: interlocutorId,
			});

		socketService.emitMessage({
			event: SocketEvent.CHAT_READ_MESSAGES,
			payload: {
				chatId,
				items: readChatMessages,
				unreadMessageCount,
				unreadMessageCountTotal,
			},
			receiversIds: [String(userId)],
			targetNamespace: SocketNamespace.CHAT,
		});

		socketService.emitMessage({
			event: SocketEvent.CHAT_READ_MESSAGES,
			payload: {
				chatId,
				interlocutorUnreadMessageCount,
				interlocutorUnreadMessageCountTotal,
				items: readChatMessages,
			},
			receiversIds: [String(interlocutorId)],
			targetNamespace: SocketNamespace.CHAT,
		});

		return {
			chatId,
			items: readChatMessages.map((chatMessage) => {
				return chatMessage.toObject();
			}),
			unreadMessageCount,
			unreadMessageCountTotal,
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
				status: updateMessageData.status,
				text: updateMessageData.text,
			}),
		);

		return updatedMessage.toObject();
	}
}

export { ChatMessageService };

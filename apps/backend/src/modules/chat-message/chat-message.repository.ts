import { Repository } from "~/libs/types/types.js";

import { UserEntity } from "../users/users.js";
import { ChatEntity } from "./chat.entity.js";
import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageModel } from "./chat-message.model.js";
import { MessageStatus } from "./libs/enums/enums.js";

class ChatMessageRepository implements Repository<ChatMessageEntity> {
	private chatMessageModel: typeof ChatMessageModel;

	public constructor(chatMessageModel: typeof ChatMessageModel) {
		this.chatMessageModel = chatMessageModel;
	}

	public async checkIfUserIsChatOwner(
		userId: number,
		chatId: string,
	): Promise<boolean> {
		return Boolean(
			await this.chatMessageModel
				.query()
				.where({ chatId, receiverId: userId })
				.orWhere({ chatId, senderId: userId })
				.first()
				.execute(),
		);
	}

	public async create(entity: ChatMessageEntity): Promise<ChatMessageEntity> {
		const {
			chatId,
			message,
			receiverUser: receiverUser,
			senderUser: senderUser,
		} = entity.toNewObject();

		const { id: receiverId } = receiverUser.toObject();
		const { id: senderId } = senderUser.toObject();

		const chatMessage = await this.chatMessageModel
			.query()
			.insert(
				chatId
					? { chatId, message, receiverId, senderId }
					: { message, receiverId, senderId },
			)
			.returning("*")
			.withGraphFetched("[receiverUser.userDetails, senderUser.userDetails]")
			.execute();

		return ChatMessageEntity.initialize({
			chatId: chatMessage.chatId,
			createdAt: chatMessage.createdAt,
			id: chatMessage.id,
			message: chatMessage.message,
			receiverUser: UserEntity.initialize({
				createdAt: chatMessage.receiverUser.createdAt,
				email: chatMessage.receiverUser.email,
				firstName: chatMessage.receiverUser.userDetails.firstName,
				id: chatMessage.receiverUser.id,
				lastName: chatMessage.receiverUser.userDetails.lastName,
				passwordHash: chatMessage.receiverUser.passwordHash,
				passwordSalt: chatMessage.receiverUser.passwordSalt,
				updatedAt: chatMessage.receiverUser.updatedAt,
			}),
			senderUser: UserEntity.initialize({
				createdAt: chatMessage.senderUser.createdAt,
				email: chatMessage.senderUser.email,
				firstName: chatMessage.senderUser.userDetails.firstName,
				id: chatMessage.senderUser.id,
				lastName: chatMessage.senderUser.userDetails.lastName,
				passwordHash: chatMessage.senderUser.passwordHash,
				passwordSalt: chatMessage.senderUser.passwordSalt,
				updatedAt: chatMessage.senderUser.updatedAt,
			}),
			status: chatMessage.status,
			updatedAt: chatMessage.updatedAt,
		});
	}

	public delete(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public find(): Promise<ChatMessageEntity | null> {
		return Promise.resolve(null);
	}

	public findAll(): Promise<ChatMessageEntity[]> {
		return Promise.resolve([]);
	}

	public async findAllChatsByUserId(userId: number) {
		const chats = await this.chatMessageModel
			.query()
			.with(
				"chatMessagesCte",
				this.chatMessageModel
					.query()
					.select(
						"*",
						this.chatMessageModel
							.relatedQuery("selfChatMessages")
							.where({
								"selfChatMessages.receiverId": userId,
								status: MessageStatus.UNREAD,
							})
							.count()
							.as("unreadMessageCount"),
					)
					.distinctOn("chatId")
					.where({ receiverId: userId })
					.orWhere({ senderId: userId })
					.orderBy("chatId")
					.orderBy("chatMessages.createdAt", "desc"),
			)
			.select("*")
			.from("chatMessagesCte")
			.orderBy("chatMessagesCte.createdAt", "desc")
			.withGraphFetched("[receiverUser.userDetails, senderUser.userDetails]")
			.castTo<(ChatMessageModel & { unreadMessageCount: number })[]>()
			.execute();

		return chats.map((chat) => {
			const interlocutor =
				userId === chat.receiverId ? "senderUser" : "receiverUser";

			return ChatEntity.initialize({
				id: chat.chatId,
				interlocutor: UserEntity.initialize({
					createdAt: chat[interlocutor].createdAt,
					email: chat[interlocutor].email,
					firstName: chat[interlocutor].userDetails.firstName,
					id: chat[interlocutor].id,
					lastName: chat[interlocutor].userDetails.lastName,
					passwordHash: chat[interlocutor].passwordHash,
					passwordSalt: chat[interlocutor].passwordSalt,
					updatedAt: chat[interlocutor].updatedAt,
				}),
				lastMessage: ChatMessageEntity.initialize({
					chatId: chat.chatId,
					createdAt: chat.createdAt,
					id: chat.id,
					message: chat.message,
					receiverUser: UserEntity.initialize({
						createdAt: chat.receiverUser.createdAt,
						email: chat.receiverUser.email,
						firstName: chat.receiverUser.userDetails.firstName,
						id: chat.receiverUser.id,
						lastName: chat.receiverUser.userDetails.lastName,
						passwordHash: chat.receiverUser.passwordHash,
						passwordSalt: chat.receiverUser.passwordSalt,
						updatedAt: chat.receiverUser.updatedAt,
					}),
					senderUser: UserEntity.initialize({
						createdAt: chat.senderUser.createdAt,
						email: chat.senderUser.email,
						firstName: chat.senderUser.userDetails.firstName,
						id: chat.senderUser.id,
						lastName: chat.senderUser.userDetails.lastName,
						passwordHash: chat.senderUser.passwordHash,
						passwordSalt: chat.senderUser.passwordSalt,
						updatedAt: chat.senderUser.updatedAt,
					}),
					status: chat.status,
					updatedAt: chat.updatedAt,
				}),
				unreadMessageCount: chat.unreadMessageCount,
			});
		});
	}

	public async findAllMessagesByChatId(
		chatId: string,
	): Promise<ChatMessageEntity[]> {
		const chatMessages = await this.chatMessageModel
			.query()
			.where({ chatId })
			.orderBy("createdAt", "desc")
			.withGraphFetched("[senderUser.userDetails, receiverUser.userDetails]")
			.execute();

		return chatMessages.map((chatMessage) =>
			ChatMessageEntity.initialize({
				chatId: chatMessage.chatId,
				createdAt: chatMessage.createdAt,
				id: chatMessage.id,
				message: chatMessage.message,
				receiverUser: UserEntity.initialize({
					createdAt: chatMessage.receiverUser.createdAt,
					email: chatMessage.receiverUser.email,
					firstName: chatMessage.receiverUser.userDetails.firstName,
					id: chatMessage.receiverUser.id,
					lastName: chatMessage.receiverUser.userDetails.lastName,
					passwordHash: chatMessage.receiverUser.passwordHash,
					passwordSalt: chatMessage.receiverUser.passwordSalt,
					updatedAt: chatMessage.receiverUser.updatedAt,
				}),
				senderUser: UserEntity.initialize({
					createdAt: chatMessage.senderUser.createdAt,
					email: chatMessage.senderUser.email,
					firstName: chatMessage.senderUser.userDetails.firstName,
					id: chatMessage.senderUser.id,
					lastName: chatMessage.senderUser.userDetails.lastName,
					passwordHash: chatMessage.senderUser.passwordHash,
					passwordSalt: chatMessage.senderUser.passwordSalt,
					updatedAt: chatMessage.senderUser.updatedAt,
				}),
				status: chatMessage.status,
				updatedAt: chatMessage.updatedAt,
			}),
		);
	}

	public async getChatIdBySenderIdAndReceiverId(
		senderId: number,
		receiverId: number,
	): Promise<null | string> {
		const chatMessage = await this.chatMessageModel
			.query()
			.select()
			.where({ receiverId, senderId })
			.orWhere({ receiverId: senderId, senderId: receiverId })
			.first();

		return chatMessage?.chatId ?? null;
	}

	public update(): Promise<ChatMessageEntity | null> {
		return Promise.resolve(null);
	}
}

export { ChatMessageRepository };

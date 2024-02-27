import { type Repository } from "~/libs/types/types.js";
import {
	ChatMessageEntity,
	MessageStatus,
} from "~/modules/chat-messages/chat-message.js";
import { type ChatMessageModel } from "~/modules/chat-messages/chat-message.js";
import { UserEntity } from "~/modules/users/users.js";

import { ChatEntity } from "./chat.entity.js";
import { ChatModel } from "./chat.model.js";
import { RelationName } from "./libs/enums/enums.js";

class ChatRepository implements Repository<ChatEntity> {
	private chatModel: typeof ChatModel;

	public constructor(chatModel: typeof ChatModel) {
		this.chatModel = chatModel;
	}

	public async create(chatEntity: ChatEntity): Promise<ChatEntity> {
		const { firstUserId, secondUserId } = chatEntity.toNewObject();
		const createdChat = await this.chatModel
			.query()
			.insert({ firstUserId, secondUserId })
			.withGraphFetched(
				`[${RelationName.FIRST_USER}.${RelationName.USER_DETAILS}, ${RelationName.SECOND_USER}.${RelationName.USER_DETAILS}]`,
			)
			.returning("*")
			.execute();

		return ChatEntity.initializeWithMessages({
			createdAt: createdChat.createdAt,
			firstUser: UserEntity.initialize({
				avatarUrl: createdChat.firstUser.userDetails.avatarFile?.url ?? null,
				createdAt: createdChat.firstUser.createdAt,
				email: createdChat.firstUser.email,
				firstName: createdChat.firstUser.userDetails.firstName,
				id: createdChat.firstUser.id,
				lastName: createdChat.firstUser.userDetails.lastName,
				passwordHash: createdChat.firstUser.passwordHash,
				passwordSalt: createdChat.firstUser.passwordSalt,
				updatedAt: createdChat.firstUser.updatedAt,
			}),
			id: createdChat.id,
			messages: [],
			secondUser: UserEntity.initialize({
				avatarUrl: createdChat.secondUser.userDetails.avatarFile?.url ?? null,
				createdAt: createdChat.secondUser.createdAt,
				email: createdChat.secondUser.email,
				firstName: createdChat.secondUser.userDetails.firstName,
				id: createdChat.secondUser.id,
				lastName: createdChat.secondUser.userDetails.lastName,
				passwordHash: createdChat.secondUser.passwordHash,
				passwordSalt: createdChat.secondUser.passwordSalt,
				updatedAt: createdChat.secondUser.updatedAt,
			}),
			updatedAt: createdChat.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedChatCount = await this.chatModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedChatCount);
	}

	public async find(id: number): Promise<ChatEntity | null> {
		const chatById = await this.chatModel
			.query()
			.findById(id)
			.withGraphFetched(
				`[${RelationName.FIRST_USER}.${RelationName.USER_DETAILS}, ${RelationName.SECOND_USER}.${RelationName.USER_DETAILS}]`,
			)
			.execute();

		return chatById
			? ChatEntity.initialize({
					createdAt: chatById.createdAt,
					firstUser: UserEntity.initialize({
						avatarUrl: chatById.firstUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatById.firstUser.createdAt,
						email: chatById.firstUser.email,
						firstName: chatById.firstUser.userDetails.firstName,
						id: chatById.firstUser.id,
						lastName: chatById.firstUser.userDetails.lastName,
						passwordHash: chatById.firstUser.passwordHash,
						passwordSalt: chatById.firstUser.passwordSalt,
						updatedAt: chatById.firstUser.updatedAt,
					}),
					id: chatById.id,
					secondUser: UserEntity.initialize({
						avatarUrl: chatById.secondUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatById.secondUser.createdAt,
						email: chatById.secondUser.email,
						firstName: chatById.secondUser.userDetails.firstName,
						id: chatById.secondUser.id,
						lastName: chatById.secondUser.userDetails.lastName,
						passwordHash: chatById.secondUser.passwordHash,
						passwordSalt: chatById.secondUser.passwordSalt,
						updatedAt: chatById.secondUser.updatedAt,
					}),
					updatedAt: chatById.updatedAt,
				})
			: null;
	}

	public async findAll(userId: number): Promise<ChatEntity[]> {
		const chatsByUserId = await this.chatModel
			.query()
			.select(
				"*",
				this.chatModel
					.relatedQuery<ChatMessageModel>(RelationName.MESSAGES)
					.count()
					.where({ status: MessageStatus.UNREAD })
					.andWhereNot({ senderUserId: userId })
					.castTo<number>()
					.as("unreadMessageCount"),
			)
			.whereExists(ChatModel.relatedQuery(RelationName.LAST_MESSAGE))
			.andWhere((builder) => {
				void builder
					.where({ firstUserId: userId })
					.orWhere({ secondUserId: userId });
			})
			.withGraphJoined(
				`[${RelationName.FIRST_USER}.${RelationName.USER_DETAILS}, ${RelationName.SECOND_USER}.${RelationName.USER_DETAILS}, ${RelationName.LAST_MESSAGE}.${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}]`,
			)
			.orderBy(`${RelationName.LAST_MESSAGE}:id`, "desc")
			.castTo<
				(ChatModel & {
					lastMessage: ChatMessageModel;
					unreadMessageCount: number;
				})[]
			>()
			.execute();

		return chatsByUserId.map((chatByUserId) => {
			return ChatEntity.initializeWithLastMessage({
				createdAt: chatByUserId.createdAt,
				firstUser: UserEntity.initialize({
					avatarUrl: chatByUserId.firstUser.userDetails.avatarFile?.url ?? null,
					createdAt: chatByUserId.firstUser.createdAt,
					email: chatByUserId.firstUser.email,
					firstName: chatByUserId.firstUser.userDetails.firstName,
					id: chatByUserId.firstUser.id,
					lastName: chatByUserId.firstUser.userDetails.lastName,
					passwordHash: chatByUserId.firstUser.passwordHash,
					passwordSalt: chatByUserId.firstUser.passwordSalt,
					updatedAt: chatByUserId.firstUser.updatedAt,
				}),
				id: chatByUserId.id,
				lastMessage: ChatMessageEntity.initialize({
					chatId: chatByUserId.lastMessage.chatId,
					createdAt: chatByUserId.lastMessage.createdAt,
					id: chatByUserId.lastMessage.id,
					senderUser: UserEntity.initialize({
						avatarUrl:
							chatByUserId.lastMessage.senderUser.userDetails.avatarFile?.url ??
							null,
						createdAt: chatByUserId.lastMessage.senderUser.createdAt,
						email: chatByUserId.lastMessage.senderUser.email,
						firstName:
							chatByUserId.lastMessage.senderUser.userDetails.firstName,
						id: chatByUserId.lastMessage.senderUser.id,
						lastName: chatByUserId.lastMessage.senderUser.userDetails.lastName,
						passwordHash: chatByUserId.lastMessage.senderUser.passwordHash,
						passwordSalt: chatByUserId.lastMessage.senderUser.passwordSalt,
						updatedAt: chatByUserId.lastMessage.senderUser.updatedAt,
					}),
					status: chatByUserId.lastMessage.status,
					text: chatByUserId.lastMessage.text,
					updatedAt: chatByUserId.lastMessage.updatedAt,
				}),
				secondUser: UserEntity.initialize({
					avatarUrl:
						chatByUserId.secondUser.userDetails.avatarFile?.url ?? null,
					createdAt: chatByUserId.secondUser.createdAt,
					email: chatByUserId.secondUser.email,
					firstName: chatByUserId.secondUser.userDetails.firstName,
					id: chatByUserId.secondUser.id,
					lastName: chatByUserId.secondUser.userDetails.lastName,
					passwordHash: chatByUserId.secondUser.passwordHash,
					passwordSalt: chatByUserId.secondUser.passwordSalt,
					updatedAt: chatByUserId.secondUser.updatedAt,
				}),
				unreadMessageCount: chatByUserId.unreadMessageCount,
				updatedAt: chatByUserId.updatedAt,
			});
		});
	}

	public async findByMembersIds(
		firstUserId: number,
		secondUserId: number,
	): Promise<ChatEntity | null> {
		const chatByMembersIds = await this.chatModel
			.query()
			.where({ firstUserId, secondUserId })
			.orWhere({ firstUserId: secondUserId, secondUserId: firstUserId })
			.withGraphFetched(
				`[${RelationName.FIRST_USER}.${RelationName.USER_DETAILS}, ${RelationName.SECOND_USER}.${RelationName.USER_DETAILS}, ${RelationName.MESSAGES}.${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}]`,
			)
			.first();

		return chatByMembersIds
			? ChatEntity.initializeWithMessages({
					createdAt: chatByMembersIds.createdAt,
					firstUser: UserEntity.initialize({
						avatarUrl:
							chatByMembersIds.firstUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatByMembersIds.firstUser.createdAt,
						email: chatByMembersIds.firstUser.email,
						firstName: chatByMembersIds.firstUser.userDetails.firstName,
						id: chatByMembersIds.firstUser.id,
						lastName: chatByMembersIds.firstUser.userDetails.lastName,
						passwordHash: chatByMembersIds.firstUser.passwordHash,
						passwordSalt: chatByMembersIds.firstUser.passwordSalt,
						updatedAt: chatByMembersIds.firstUser.updatedAt,
					}),
					id: chatByMembersIds.id,
					messages: chatByMembersIds.messages.map((message) =>
						ChatMessageEntity.initialize({
							chatId: message.chatId,
							createdAt: message.createdAt,
							id: message.id,
							senderUser: UserEntity.initialize({
								avatarUrl:
									message.senderUser.userDetails.avatarFile?.url ?? null,
								createdAt: message.senderUser.createdAt,
								email: message.senderUser.email,
								firstName: message.senderUser.userDetails.firstName,
								id: message.senderUser.id,
								lastName: message.senderUser.userDetails.lastName,
								passwordHash: message.senderUser.passwordHash,
								passwordSalt: message.senderUser.passwordSalt,
								updatedAt: message.senderUser.updatedAt,
							}),
							status: message.status,
							text: message.text,
							updatedAt: message.updatedAt,
						}),
					),
					secondUser: UserEntity.initialize({
						avatarUrl:
							chatByMembersIds.secondUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatByMembersIds.secondUser.createdAt,
						email: chatByMembersIds.secondUser.email,
						firstName: chatByMembersIds.secondUser.userDetails.firstName,
						id: chatByMembersIds.secondUser.id,
						lastName: chatByMembersIds.secondUser.userDetails.lastName,
						passwordHash: chatByMembersIds.secondUser.passwordHash,
						passwordSalt: chatByMembersIds.secondUser.passwordSalt,
						updatedAt: chatByMembersIds.secondUser.updatedAt,
					}),
					updatedAt: chatByMembersIds.updatedAt,
				})
			: null;
	}

	public async findWithMessage(id: number): Promise<ChatEntity | null> {
		const chatById = await this.chatModel
			.query()
			.findById(id)
			.withGraphFetched(
				`[${RelationName.FIRST_USER}.${RelationName.USER_DETAILS}, ${RelationName.SECOND_USER}.${RelationName.USER_DETAILS}, ${RelationName.MESSAGES}.${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}]`,
			)
			.modifyGraph<ChatMessageModel>(RelationName.MESSAGES, (builder) => {
				void builder.orderBy("id", "desc");
			})
			.execute();

		return chatById
			? ChatEntity.initializeWithMessages({
					createdAt: chatById.createdAt,
					firstUser: UserEntity.initialize({
						avatarUrl: chatById.firstUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatById.firstUser.createdAt,
						email: chatById.firstUser.email,
						firstName: chatById.firstUser.userDetails.firstName,
						id: chatById.firstUser.id,
						lastName: chatById.firstUser.userDetails.lastName,
						passwordHash: chatById.firstUser.passwordHash,
						passwordSalt: chatById.firstUser.passwordSalt,
						updatedAt: chatById.firstUser.updatedAt,
					}),
					id: chatById.id,
					messages: chatById.messages.map((message) =>
						ChatMessageEntity.initialize({
							chatId: message.chatId,
							createdAt: message.createdAt,
							id: message.id,
							senderUser: UserEntity.initialize({
								avatarUrl:
									message.senderUser.userDetails.avatarFile?.url ?? null,
								createdAt: message.senderUser.createdAt,
								email: message.senderUser.email,
								firstName: message.senderUser.userDetails.firstName,
								id: message.senderUser.id,
								lastName: message.senderUser.userDetails.lastName,
								passwordHash: message.senderUser.passwordHash,
								passwordSalt: message.senderUser.passwordSalt,
								updatedAt: message.senderUser.updatedAt,
							}),
							status: message.status,
							text: message.text,
							updatedAt: message.updatedAt,
						}),
					),
					secondUser: UserEntity.initialize({
						avatarUrl: chatById.secondUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatById.secondUser.createdAt,
						email: chatById.secondUser.email,
						firstName: chatById.secondUser.userDetails.firstName,
						id: chatById.secondUser.id,
						lastName: chatById.secondUser.userDetails.lastName,
						passwordHash: chatById.secondUser.passwordHash,
						passwordSalt: chatById.secondUser.passwordSalt,
						updatedAt: chatById.secondUser.updatedAt,
					}),
					updatedAt: chatById.updatedAt,
				})
			: null;
	}

	public async update(id: number, chatEntity: ChatEntity): Promise<ChatEntity> {
		const { firstUserId, secondUserId } = chatEntity.toNewObject();

		const updatedChat = await this.chatModel.query().updateAndFetchById(id, {
			firstUserId,
			secondUserId,
		});

		return ChatEntity.initialize({
			createdAt: updatedChat.createdAt,
			firstUser: UserEntity.initialize({
				avatarUrl: updatedChat.firstUser.userDetails.avatarFile?.url ?? null,
				createdAt: updatedChat.firstUser.createdAt,
				email: updatedChat.firstUser.email,
				firstName: updatedChat.firstUser.userDetails.firstName,
				id: updatedChat.firstUser.id,
				lastName: updatedChat.firstUser.userDetails.lastName,
				passwordHash: updatedChat.firstUser.passwordHash,
				passwordSalt: updatedChat.firstUser.passwordSalt,
				updatedAt: updatedChat.firstUser.updatedAt,
			}),
			id: updatedChat.id,
			secondUser: UserEntity.initialize({
				avatarUrl: updatedChat.secondUser.userDetails.avatarFile?.url ?? null,
				createdAt: updatedChat.secondUser.createdAt,
				email: updatedChat.secondUser.email,
				firstName: updatedChat.secondUser.userDetails.firstName,
				id: updatedChat.secondUser.id,
				lastName: updatedChat.secondUser.userDetails.lastName,
				passwordHash: updatedChat.secondUser.passwordHash,
				passwordSalt: updatedChat.secondUser.passwordSalt,
				updatedAt: updatedChat.secondUser.updatedAt,
			}),
			updatedAt: updatedChat.updatedAt,
		});
	}
}

export { ChatRepository };

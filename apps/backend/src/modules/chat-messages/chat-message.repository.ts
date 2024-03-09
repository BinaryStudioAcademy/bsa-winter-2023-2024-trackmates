import { type Repository } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/users.js";

import { ChatMessageEntity } from "./chat-message.entity.js";
import { type ChatMessageModel } from "./chat-message.model.js";
import { MessageStatus, RelationName } from "./libs/enums/enums.js";

class ChatMessageRepository implements Repository<ChatMessageEntity> {
	private chatMessageModel: typeof ChatMessageModel;

	public constructor(chatMessageModel: typeof ChatMessageModel) {
		this.chatMessageModel = chatMessageModel;
	}

	public async create(
		messageEntity: ChatMessageEntity,
	): Promise<ChatMessageEntity> {
		const { chatId, senderUserId, text } = messageEntity.toNewObject();
		const createdMessage = await this.chatMessageModel
			.query()
			.insert({
				chatId,
				senderUserId,
				text,
			})
			.withGraphFetched(
				`${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}`,
			)
			.returning("*")
			.execute();

		return ChatMessageEntity.initialize({
			chatId: createdMessage.chatId,
			createdAt: createdMessage.createdAt,
			id: createdMessage.id,
			senderUser: UserEntity.initialize({
				avatarUrl:
					createdMessage.senderUser.userDetails.avatarFile?.url ?? null,
				createdAt: createdMessage.senderUser.createdAt,
				email: createdMessage.senderUser.email,
				firstName: createdMessage.senderUser.userDetails.firstName,
				id: createdMessage.senderUser.id,
				lastName: createdMessage.senderUser.userDetails.lastName,
				nickname: createdMessage.senderUser.userDetails.nickname,
				passwordHash: createdMessage.senderUser.passwordHash,
				passwordSalt: createdMessage.senderUser.passwordSalt,
				sex: createdMessage.senderUser.userDetails.sex,
				updatedAt: createdMessage.senderUser.updatedAt,
			}),
			status: createdMessage.status,
			text: createdMessage.text,
			updatedAt: createdMessage.updatedAt,
		});
	}

	public async delete(id: number): Promise<boolean> {
		const deletedChatMessageCount = await this.chatMessageModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedChatMessageCount);
	}

	public async find(id: number): Promise<ChatMessageEntity | null> {
		const chatMessageById = await this.chatMessageModel
			.query()
			.findById(id)
			.withGraphFetched(
				`${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}`,
			)
			.execute();

		return chatMessageById
			? ChatMessageEntity.initialize({
					chatId: chatMessageById.chatId,
					createdAt: chatMessageById.createdAt,
					id: chatMessageById.id,
					senderUser: UserEntity.initialize({
						avatarUrl:
							chatMessageById.senderUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatMessageById.senderUser.createdAt,
						email: chatMessageById.senderUser.email,
						firstName: chatMessageById.senderUser.userDetails.firstName,
						id: chatMessageById.senderUser.id,
						lastName: chatMessageById.senderUser.userDetails.lastName,
						nickname: chatMessageById.senderUser.userDetails.nickname,
						passwordHash: chatMessageById.senderUser.passwordHash,
						passwordSalt: chatMessageById.senderUser.passwordSalt,
						sex: chatMessageById.senderUser.userDetails.sex,
						updatedAt: chatMessageById.senderUser.updatedAt,
					}),
					status: chatMessageById.status,
					text: chatMessageById.text,
					updatedAt: chatMessageById.updatedAt,
				})
			: null;
	}

	public async findAll(userId: number): Promise<ChatMessageEntity[]> {
		const messagesByUserId = await this.chatMessageModel
			.query()
			.where({ senderUserId: userId })
			.withGraphFetched(
				`${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}`,
			)
			.execute();

		return messagesByUserId.map((messageByUserId) => {
			return ChatMessageEntity.initialize({
				chatId: messageByUserId.chatId,
				createdAt: messageByUserId.createdAt,
				id: messageByUserId.id,
				senderUser: UserEntity.initialize({
					avatarUrl:
						messageByUserId.senderUser.userDetails.avatarFile?.url ?? null,
					createdAt: messageByUserId.senderUser.createdAt,
					email: messageByUserId.senderUser.email,
					firstName: messageByUserId.senderUser.userDetails.firstName,
					id: messageByUserId.senderUser.id,
					lastName: messageByUserId.senderUser.userDetails.lastName,
					nickname: messageByUserId.senderUser.userDetails.nickname,
					passwordHash: messageByUserId.senderUser.passwordHash,
					passwordSalt: messageByUserId.senderUser.passwordSalt,
					sex: messageByUserId.senderUser.userDetails.sex,
					updatedAt: messageByUserId.senderUser.updatedAt,
				}),
				status: messageByUserId.status,
				text: messageByUserId.text,
				updatedAt: messageByUserId.updatedAt,
			});
		});
	}

	public async setReadChatMessages(
		chatMessageIds: number[],
	): Promise<ChatMessageEntity[]> {
		const updatedChatMessages = await this.chatMessageModel
			.query()
			.whereIn("id", chatMessageIds)
			.update({ status: MessageStatus.READ })
			.withGraphFetched(
				`${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}`,
			)
			.returning("*")
			.execute();

		return updatedChatMessages.map((chatMessage) => {
			return ChatMessageEntity.initialize({
				chatId: chatMessage.chatId,
				createdAt: chatMessage.createdAt,
				id: chatMessage.id,
				senderUser: UserEntity.initialize({
					avatarUrl: chatMessage.senderUser.userDetails.avatarFile?.url ?? null,
					createdAt: chatMessage.senderUser.createdAt,
					email: chatMessage.senderUser.email,
					firstName: chatMessage.senderUser.userDetails.firstName,
					id: chatMessage.senderUser.id,
					lastName: chatMessage.senderUser.userDetails.lastName,
					nickname: chatMessage.senderUser.userDetails.nickname,
					passwordHash: chatMessage.senderUser.passwordHash,
					passwordSalt: chatMessage.senderUser.passwordSalt,
					sex: chatMessage.senderUser.userDetails.sex,
					updatedAt: chatMessage.senderUser.updatedAt,
				}),
				status: chatMessage.status,
				text: chatMessage.text,
				updatedAt: chatMessage.updatedAt,
			});
		});
	}

	public async update(
		id: number,
		messageEntity: ChatMessageEntity,
	): Promise<ChatMessageEntity> {
		const { text } = messageEntity.toObject();
		const updatedChatMessage = await this.chatMessageModel
			.query()
			.updateAndFetchById(id, {
				text,
			})
			.withGraphFetched(
				`${RelationName.SENDER_USER}.${RelationName.USER_DETAILS}`,
			)
			.execute();

		return ChatMessageEntity.initialize({
			chatId: updatedChatMessage.chatId,
			createdAt: updatedChatMessage.createdAt,
			id: updatedChatMessage.id,
			senderUser: UserEntity.initialize({
				avatarUrl:
					updatedChatMessage.senderUser.userDetails.avatarFile?.url ?? null,
				createdAt: updatedChatMessage.senderUser.createdAt,
				email: updatedChatMessage.senderUser.email,
				firstName: updatedChatMessage.senderUser.userDetails.firstName,
				id: updatedChatMessage.senderUser.id,
				lastName: updatedChatMessage.senderUser.userDetails.lastName,
				nickname: updatedChatMessage.senderUser.userDetails.nickname,
				passwordHash: updatedChatMessage.senderUser.passwordHash,
				passwordSalt: updatedChatMessage.senderUser.passwordSalt,
				sex: updatedChatMessage.senderUser.userDetails.sex,
				updatedAt: updatedChatMessage.senderUser.updatedAt,
			}),
			status: updatedChatMessage.status,
			text: updatedChatMessage.text,
			updatedAt: updatedChatMessage.updatedAt,
		});
	}
}

export { ChatMessageRepository };

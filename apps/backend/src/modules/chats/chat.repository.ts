import { type Repository } from "~/libs/types/types.js";
import {
	ChatMessageEntity,
	type ChatMessageModel,
	MessageStatus,
} from "~/modules/chat-messages/chat-messages.js";
import { GroupEntity } from "~/modules/groups/group.entity.js";
import { PermissionEntity } from "~/modules/permissions/permissions.js";
import { SubscriptionEntity } from "~/modules/subscriptions/subscriptions.js";
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
				groups: createdChat.firstUser.groups.map((group) => {
					return GroupEntity.initialize({
						createdAt: group.createdAt,
						id: group.id,
						key: group.key,
						name: group.name,
						permissions: group.permissions.map((permission) => {
							return PermissionEntity.initialize({
								createdAt: permission.createdAt,
								id: permission.id,
								key: permission.key,
								name: permission.name,
								updatedAt: permission.updatedAt,
							});
						}),
						updatedAt: group.updatedAt,
					});
				}),
				id: createdChat.firstUser.id,
				lastName: createdChat.firstUser.userDetails.lastName,
				nickname: createdChat.firstUser.userDetails.nickname,
				passwordHash: createdChat.firstUser.passwordHash,
				passwordSalt: createdChat.firstUser.passwordSalt,
				sex: createdChat.firstUser.userDetails.sex,
				subscription: createdChat.firstUser.userDetails.subscription
					? SubscriptionEntity.initialize({
							createdAt:
								createdChat.firstUser.userDetails.subscription.createdAt,
							expiresAt:
								createdChat.firstUser.userDetails.subscription.expiresAt,
							id: createdChat.firstUser.userDetails.subscription.id,
							updatedAt:
								createdChat.firstUser.userDetails.subscription.updatedAt,
						})
					: null,
				updatedAt: createdChat.firstUser.updatedAt,
			}),
			id: createdChat.id,
			messages: [],
			secondUser: UserEntity.initialize({
				avatarUrl: createdChat.secondUser.userDetails.avatarFile?.url ?? null,
				createdAt: createdChat.secondUser.createdAt,
				email: createdChat.secondUser.email,
				firstName: createdChat.secondUser.userDetails.firstName,
				groups: createdChat.secondUser.groups.map((group) => {
					return GroupEntity.initialize({
						createdAt: group.createdAt,
						id: group.id,
						key: group.key,
						name: group.name,
						permissions: group.permissions.map((permission) => {
							return PermissionEntity.initialize({
								createdAt: permission.createdAt,
								id: permission.id,
								key: permission.key,
								name: permission.name,
								updatedAt: permission.updatedAt,
							});
						}),
						updatedAt: group.updatedAt,
					});
				}),
				id: createdChat.secondUser.id,
				lastName: createdChat.secondUser.userDetails.lastName,
				nickname: createdChat.secondUser.userDetails.nickname,
				passwordHash: createdChat.secondUser.passwordHash,
				passwordSalt: createdChat.secondUser.passwordSalt,
				sex: createdChat.secondUser.userDetails.sex,
				subscription: createdChat.secondUser.userDetails.subscription
					? SubscriptionEntity.initialize({
							createdAt:
								createdChat.secondUser.userDetails.subscription.createdAt,
							expiresAt:
								createdChat.secondUser.userDetails.subscription.expiresAt,
							id: createdChat.secondUser.userDetails.subscription.id,
							updatedAt:
								createdChat.secondUser.userDetails.subscription.updatedAt,
						})
					: null,
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
						groups: chatById.firstUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatById.firstUser.id,
						lastName: chatById.firstUser.userDetails.lastName,
						nickname: chatById.firstUser.userDetails.nickname,
						passwordHash: chatById.firstUser.passwordHash,
						passwordSalt: chatById.firstUser.passwordSalt,
						sex: chatById.firstUser.userDetails.sex,
						subscription: chatById.firstUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatById.firstUser.userDetails.subscription.createdAt,
									expiresAt:
										chatById.firstUser.userDetails.subscription.expiresAt,
									id: chatById.firstUser.userDetails.subscription.id,
									updatedAt:
										chatById.firstUser.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: chatById.firstUser.updatedAt,
					}),
					id: chatById.id,
					secondUser: UserEntity.initialize({
						avatarUrl: chatById.secondUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatById.secondUser.createdAt,
						email: chatById.secondUser.email,
						firstName: chatById.secondUser.userDetails.firstName,
						groups: chatById.secondUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatById.secondUser.id,
						lastName: chatById.secondUser.userDetails.lastName,
						nickname: chatById.secondUser.userDetails.nickname,
						passwordHash: chatById.secondUser.passwordHash,
						passwordSalt: chatById.secondUser.passwordSalt,
						sex: chatById.secondUser.userDetails.sex,
						subscription: chatById.secondUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatById.secondUser.userDetails.subscription.createdAt,
									expiresAt:
										chatById.secondUser.userDetails.subscription.expiresAt,
									id: chatById.secondUser.userDetails.subscription.id,
									updatedAt:
										chatById.secondUser.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: chatById.secondUser.updatedAt,
					}),
					updatedAt: chatById.updatedAt,
				})
			: null;
	}

	public async findAll({
		search,
		userId,
	}: {
		search: string;
		userId: number;
	}): Promise<{ items: ChatEntity[] }> {
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
					.where((builder) => {
						void builder
							.whereILike("firstUser:userDetails.lastName", `%${search}%`)
							.orWhereRaw("concat(??, ' ', ??) ILIKE ?", [
								"firstUser:userDetails.firstName",
								"firstUser:userDetails.lastName",
								`%${search}%`,
							]);
					})
					.andWhere({ secondUserId: userId })
					.orWhere((builder) => {
						void builder
							.whereILike("secondUser:userDetails.lastName", `%${search}%`)
							.orWhereRaw("concat(??, ' ', ??) ILIKE ?", [
								"secondUser:userDetails.firstName",
								"secondUser:userDetails.lastName",
								`%${search}%`,
							]);
					})
					.andWhere({ firstUserId: userId });
			})
			.withGraphJoined(
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.LAST_MESSAGE}.${RelationName.SENDER_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
			)
			.orderBy(`${RelationName.LAST_MESSAGE}:id`, "desc")
			.castTo<
				(ChatModel & {
					lastMessage: ChatMessageModel;
					unreadMessageCount: number;
				})[]
			>()
			.execute();

		return {
			items: chatsByUserId.map((chatByUserId) => {
				return ChatEntity.initializeWithLastMessage({
					createdAt: chatByUserId.createdAt,
					firstUser: UserEntity.initialize({
						avatarUrl:
							chatByUserId.firstUser.userDetails.avatarFile?.url ?? null,
						createdAt: chatByUserId.firstUser.createdAt,
						email: chatByUserId.firstUser.email,
						firstName: chatByUserId.firstUser.userDetails.firstName,
						groups: chatByUserId.firstUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatByUserId.firstUser.id,
						lastName: chatByUserId.firstUser.userDetails.lastName,
						nickname: chatByUserId.firstUser.userDetails.nickname,
						passwordHash: chatByUserId.firstUser.passwordHash,
						passwordSalt: chatByUserId.firstUser.passwordSalt,
						sex: chatByUserId.firstUser.userDetails.sex,
						subscription: chatByUserId.firstUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatByUserId.firstUser.userDetails.subscription.createdAt,
									expiresAt:
										chatByUserId.firstUser.userDetails.subscription.expiresAt,
									id: chatByUserId.firstUser.userDetails.subscription.id,
									updatedAt:
										chatByUserId.firstUser.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: chatByUserId.firstUser.updatedAt,
					}),
					id: chatByUserId.id,
					lastMessage: ChatMessageEntity.initialize({
						chatId: chatByUserId.lastMessage.chatId,
						createdAt: chatByUserId.lastMessage.createdAt,
						id: chatByUserId.lastMessage.id,
						senderUser: UserEntity.initialize({
							avatarUrl:
								chatByUserId.lastMessage.senderUser.userDetails.avatarFile
									?.url ?? null,
							createdAt: chatByUserId.lastMessage.senderUser.createdAt,
							email: chatByUserId.lastMessage.senderUser.email,
							firstName:
								chatByUserId.lastMessage.senderUser.userDetails.firstName,
							groups: chatByUserId.lastMessage.senderUser.groups.map(
								(group) => {
									return GroupEntity.initialize({
										createdAt: group.createdAt,
										id: group.id,
										key: group.key,
										name: group.name,
										permissions: group.permissions.map((permission) => {
											return PermissionEntity.initialize({
												createdAt: permission.createdAt,
												id: permission.id,
												key: permission.key,
												name: permission.name,
												updatedAt: permission.updatedAt,
											});
										}),
										updatedAt: group.updatedAt,
									});
								},
							),
							id: chatByUserId.lastMessage.senderUser.id,
							lastName:
								chatByUserId.lastMessage.senderUser.userDetails.lastName,
							nickname:
								chatByUserId.lastMessage.senderUser.userDetails.nickname,
							passwordHash: chatByUserId.lastMessage.senderUser.passwordHash,
							passwordSalt: chatByUserId.lastMessage.senderUser.passwordSalt,
							sex: chatByUserId.lastMessage.senderUser.userDetails.sex,
							subscription: chatByUserId.lastMessage.senderUser.userDetails
								.subscription
								? SubscriptionEntity.initialize({
										createdAt:
											chatByUserId.lastMessage.senderUser.userDetails
												.subscription.createdAt,
										expiresAt:
											chatByUserId.lastMessage.senderUser.userDetails
												.subscription.expiresAt,
										id: chatByUserId.lastMessage.senderUser.userDetails
											.subscription.id,
										updatedAt:
											chatByUserId.lastMessage.senderUser.userDetails
												.subscription.updatedAt,
									})
								: null,
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
						groups: chatByUserId.secondUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatByUserId.secondUser.id,
						lastName: chatByUserId.secondUser.userDetails.lastName,
						nickname: chatByUserId.secondUser.userDetails.nickname,
						passwordHash: chatByUserId.secondUser.passwordHash,
						passwordSalt: chatByUserId.secondUser.passwordSalt,
						sex: chatByUserId.secondUser.userDetails.sex,
						subscription: chatByUserId.secondUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatByUserId.secondUser.userDetails.subscription.createdAt,
									expiresAt:
										chatByUserId.secondUser.userDetails.subscription.expiresAt,
									id: chatByUserId.secondUser.userDetails.subscription.id,
									updatedAt:
										chatByUserId.secondUser.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: chatByUserId.secondUser.updatedAt,
					}),
					unreadMessageCount: chatByUserId.unreadMessageCount,
					updatedAt: chatByUserId.updatedAt,
				});
			}),
		};
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.MESSAGES}.${RelationName.SENDER_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
						groups: chatByMembersIds.firstUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatByMembersIds.firstUser.id,
						lastName: chatByMembersIds.firstUser.userDetails.lastName,
						nickname: chatByMembersIds.firstUser.userDetails.nickname,
						passwordHash: chatByMembersIds.firstUser.passwordHash,
						passwordSalt: chatByMembersIds.firstUser.passwordSalt,
						sex: chatByMembersIds.firstUser.userDetails.sex,
						subscription: chatByMembersIds.firstUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatByMembersIds.firstUser.userDetails.subscription
											.createdAt,
									expiresAt:
										chatByMembersIds.firstUser.userDetails.subscription
											.expiresAt,
									id: chatByMembersIds.firstUser.userDetails.subscription.id,
									updatedAt:
										chatByMembersIds.firstUser.userDetails.subscription
											.updatedAt,
								})
							: null,
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
								groups: message.senderUser.groups.map((group) => {
									return GroupEntity.initialize({
										createdAt: group.createdAt,
										id: group.id,
										key: group.key,
										name: group.name,
										permissions: group.permissions.map((permission) => {
											return PermissionEntity.initialize({
												createdAt: permission.createdAt,
												id: permission.id,
												key: permission.key,
												name: permission.name,
												updatedAt: permission.updatedAt,
											});
										}),
										updatedAt: group.updatedAt,
									});
								}),
								id: message.senderUser.id,
								lastName: message.senderUser.userDetails.lastName,
								nickname: message.senderUser.userDetails.nickname,
								passwordHash: message.senderUser.passwordHash,
								passwordSalt: message.senderUser.passwordSalt,
								sex: message.senderUser.userDetails.sex,
								subscription: message.senderUser.userDetails.subscription
									? SubscriptionEntity.initialize({
											createdAt:
												message.senderUser.userDetails.subscription.createdAt,
											expiresAt:
												message.senderUser.userDetails.subscription.expiresAt,
											id: message.senderUser.userDetails.subscription.id,
											updatedAt:
												message.senderUser.userDetails.subscription.updatedAt,
										})
									: null,
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
						groups: chatByMembersIds.secondUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatByMembersIds.secondUser.id,
						lastName: chatByMembersIds.secondUser.userDetails.lastName,
						nickname: chatByMembersIds.secondUser.userDetails.nickname,
						passwordHash: chatByMembersIds.secondUser.passwordHash,
						passwordSalt: chatByMembersIds.secondUser.passwordSalt,
						sex: chatByMembersIds.secondUser.userDetails.sex,
						subscription: chatByMembersIds.secondUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatByMembersIds.secondUser.userDetails.subscription
											.createdAt,
									expiresAt:
										chatByMembersIds.secondUser.userDetails.subscription
											.expiresAt,
									id: chatByMembersIds.secondUser.userDetails.subscription.id,
									updatedAt:
										chatByMembersIds.secondUser.userDetails.subscription
											.updatedAt,
								})
							: null,
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.MESSAGES}.${RelationName.SENDER_USER}.[${RelationName.USER_DETAILS}.[${RelationName.AVATAR_FILE},${RelationName.SUBSCRIPTION}], ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
						groups: chatById.firstUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatById.firstUser.id,
						lastName: chatById.firstUser.userDetails.lastName,
						nickname: chatById.firstUser.userDetails.nickname,
						passwordHash: chatById.firstUser.passwordHash,
						passwordSalt: chatById.firstUser.passwordSalt,
						sex: chatById.firstUser.userDetails.sex,
						subscription: chatById.firstUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatById.firstUser.userDetails.subscription.createdAt,
									expiresAt:
										chatById.firstUser.userDetails.subscription.expiresAt,
									id: chatById.firstUser.userDetails.subscription.id,
									updatedAt:
										chatById.firstUser.userDetails.subscription.updatedAt,
								})
							: null,
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
								groups: message.senderUser.groups.map((group) => {
									return GroupEntity.initialize({
										createdAt: group.createdAt,
										id: group.id,
										key: group.key,
										name: group.name,
										permissions: group.permissions.map((permission) => {
											return PermissionEntity.initialize({
												createdAt: permission.createdAt,
												id: permission.id,
												key: permission.key,
												name: permission.name,
												updatedAt: permission.updatedAt,
											});
										}),
										updatedAt: group.updatedAt,
									});
								}),
								id: message.senderUser.id,
								lastName: message.senderUser.userDetails.lastName,
								nickname: message.senderUser.userDetails.nickname,
								passwordHash: message.senderUser.passwordHash,
								passwordSalt: message.senderUser.passwordSalt,
								sex: message.senderUser.userDetails.sex,
								subscription: message.senderUser.userDetails.subscription
									? SubscriptionEntity.initialize({
											createdAt:
												message.senderUser.userDetails.subscription.createdAt,
											expiresAt:
												message.senderUser.userDetails.subscription.expiresAt,
											id: message.senderUser.userDetails.subscription.id,
											updatedAt:
												message.senderUser.userDetails.subscription.updatedAt,
										})
									: null,
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
						groups: chatById.secondUser.groups.map((group) => {
							return GroupEntity.initialize({
								createdAt: group.createdAt,
								id: group.id,
								key: group.key,
								name: group.name,
								permissions: group.permissions.map((permission) => {
									return PermissionEntity.initialize({
										createdAt: permission.createdAt,
										id: permission.id,
										key: permission.key,
										name: permission.name,
										updatedAt: permission.updatedAt,
									});
								}),
								updatedAt: group.updatedAt,
							});
						}),
						id: chatById.secondUser.id,
						lastName: chatById.secondUser.userDetails.lastName,
						nickname: chatById.secondUser.userDetails.nickname,
						passwordHash: chatById.secondUser.passwordHash,
						passwordSalt: chatById.secondUser.passwordSalt,
						sex: chatById.secondUser.userDetails.sex,
						subscription: chatById.secondUser.userDetails.subscription
							? SubscriptionEntity.initialize({
									createdAt:
										chatById.secondUser.userDetails.subscription.createdAt,
									expiresAt:
										chatById.secondUser.userDetails.subscription.expiresAt,
									id: chatById.secondUser.userDetails.subscription.id,
									updatedAt:
										chatById.secondUser.userDetails.subscription.updatedAt,
								})
							: null,
						updatedAt: chatById.secondUser.updatedAt,
					}),
					updatedAt: chatById.updatedAt,
				})
			: null;
	}

	public async getUnreadMessagesCount(userId: number): Promise<number> {
		const { count } = await this.chatModel
			.query()
			.count()
			.joinRelated(RelationName.MESSAGES)
			.where({ status: MessageStatus.UNREAD })
			.andWhere((builder) => {
				void builder
					.where({ secondUserId: userId })
					.orWhere({ firstUserId: userId });
			})
			.andWhereNot({ senderUserId: userId })
			.first()
			.castTo<{ count: number }>();

		return count;
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
				groups: updatedChat.firstUser.groups.map((group) => {
					return GroupEntity.initialize({
						createdAt: group.createdAt,
						id: group.id,
						key: group.key,
						name: group.name,
						permissions: group.permissions.map((permission) => {
							return PermissionEntity.initialize({
								createdAt: permission.createdAt,
								id: permission.id,
								key: permission.key,
								name: permission.name,
								updatedAt: permission.updatedAt,
							});
						}),
						updatedAt: group.updatedAt,
					});
				}),
				id: updatedChat.firstUser.id,
				lastName: updatedChat.firstUser.userDetails.lastName,
				nickname: updatedChat.firstUser.userDetails.nickname,
				passwordHash: updatedChat.firstUser.passwordHash,
				passwordSalt: updatedChat.firstUser.passwordSalt,
				sex: updatedChat.firstUser.userDetails.sex,
				subscription: updatedChat.firstUser.userDetails.subscription
					? SubscriptionEntity.initialize({
							createdAt:
								updatedChat.firstUser.userDetails.subscription.createdAt,
							expiresAt:
								updatedChat.firstUser.userDetails.subscription.expiresAt,
							id: updatedChat.firstUser.userDetails.subscription.id,
							updatedAt:
								updatedChat.firstUser.userDetails.subscription.updatedAt,
						})
					: null,
				updatedAt: updatedChat.firstUser.updatedAt,
			}),
			id: updatedChat.id,
			secondUser: UserEntity.initialize({
				avatarUrl: updatedChat.secondUser.userDetails.avatarFile?.url ?? null,
				createdAt: updatedChat.secondUser.createdAt,
				email: updatedChat.secondUser.email,
				firstName: updatedChat.secondUser.userDetails.firstName,
				groups: updatedChat.secondUser.groups.map((group) => {
					return GroupEntity.initialize({
						createdAt: group.createdAt,
						id: group.id,
						key: group.key,
						name: group.name,
						permissions: group.permissions.map((permission) => {
							return PermissionEntity.initialize({
								createdAt: permission.createdAt,
								id: permission.id,
								key: permission.key,
								name: permission.name,
								updatedAt: permission.updatedAt,
							});
						}),
						updatedAt: group.updatedAt,
					});
				}),
				id: updatedChat.secondUser.id,
				lastName: updatedChat.secondUser.userDetails.lastName,
				nickname: updatedChat.secondUser.userDetails.nickname,
				passwordHash: updatedChat.secondUser.passwordHash,
				passwordSalt: updatedChat.secondUser.passwordSalt,
				sex: updatedChat.secondUser.userDetails.sex,
				subscription: updatedChat.secondUser.userDetails.subscription
					? SubscriptionEntity.initialize({
							createdAt:
								updatedChat.secondUser.userDetails.subscription.createdAt,
							expiresAt:
								updatedChat.secondUser.userDetails.subscription.expiresAt,
							id: updatedChat.secondUser.userDetails.subscription.id,
							updatedAt:
								updatedChat.secondUser.userDetails.subscription.updatedAt,
						})
					: null,
				updatedAt: updatedChat.secondUser.updatedAt,
			}),
			updatedAt: updatedChat.updatedAt,
		});
	}
}

export { ChatRepository };

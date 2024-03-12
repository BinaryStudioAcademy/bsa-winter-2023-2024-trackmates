import { type Repository } from "~/libs/types/types.js";
import {
	ChatMessageEntity,
	type ChatMessageModel,
	MessageStatus,
} from "~/modules/chat-messages/chat-messages.js";
import { GroupEntity } from "~/modules/groups/group.entity.js";
import { PermissionEntity } from "~/modules/permissions/permissions.js";
import { UserEntity } from "~/modules/users/users.js";

import { ChatEntity } from "./chat.entity.js";
import { ChatModel } from "./chat.model.js";
import { RelationName } from "./libs/enums/enums.js";
import { calculateUnreadMessageCount } from "./libs/helpers/helpers.js";

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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
	}): Promise<ChatEntity[]> {
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.LAST_MESSAGE}.${RelationName.SENDER_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
						groups: chatByUserId.lastMessage.senderUser.groups.map((group) => {
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
						id: chatByUserId.lastMessage.senderUser.id,
						lastName: chatByUserId.lastMessage.senderUser.userDetails.lastName,
						nickname: chatByUserId.lastMessage.senderUser.userDetails.nickname,
						passwordHash: chatByUserId.lastMessage.senderUser.passwordHash,
						passwordSalt: chatByUserId.lastMessage.senderUser.passwordSalt,
						sex: chatByUserId.lastMessage.senderUser.userDetails.sex,
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.MESSAGES}.${RelationName.SENDER_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
				`[${RelationName.FIRST_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.SECOND_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}], ${RelationName.MESSAGES}.${RelationName.SENDER_USER}.[${RelationName.USER_DETAILS}.${RelationName.AVATAR_FILE}, ${RelationName.GROUPS}.${RelationName.PERMISSIONS}]]`,
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
						updatedAt: chatById.secondUser.updatedAt,
					}),
					updatedAt: chatById.updatedAt,
				})
			: null;
	}

	public async getUnreadMessageCount(userId: number): Promise<number> {
		const unreadChats = await this.chatModel
			.query()
			.withGraphJoined(RelationName.MESSAGES)
			.where((builder) => {
				void builder
					.where({ firstUserId: userId })
					.orWhere({ secondUserId: userId });
			})
			.andWhere((builder) => {
				void builder
					.where({ status: MessageStatus.UNREAD })
					.andWhereNot({ senderUserId: userId });
			});

		return calculateUnreadMessageCount(
			unreadChats.map((chat) => {
				return chat.messages.length;
			}),
		);
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
				updatedAt: updatedChat.secondUser.updatedAt,
			}),
			updatedAt: updatedChat.updatedAt,
		});
	}
}

export { ChatRepository };

import { Model, QueryBuilder } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { ChatMessageModel } from "~/modules/chat-messages/chat-message.model.js";
import { UserModel } from "~/modules/users/users.js";

class ChatModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			firstUser: {
				join: {
					from: `${DatabaseTableName.CHATS}.firstUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
			lastMessage: {
				filter(query: QueryBuilder<ChatMessageModel>) {
					return query
						.select("*")
						.distinctOn("chatId")
						.orderBy("chatId")
						.orderBy("id", "desc");
				},
				join: {
					from: `${DatabaseTableName.CHATS}.id`,
					to: `${DatabaseTableName.CHAT_MESSAGES}.chatId`,
				},
				modelClass: ChatMessageModel,
				relation: Model.HasOneRelation,
			},
			messages: {
				// filter(query: QueryBuilder<ChatMessageModel>) {
				// 	return query.orderBy("id", "desc");
				// },
				join: {
					from: `${DatabaseTableName.CHATS}.id`,
					to: `${DatabaseTableName.CHAT_MESSAGES}.chatId`,
				},
				modelClass: ChatMessageModel,
				relation: Model.HasManyRelation,
			},
			secondUser: {
				join: {
					from: `${DatabaseTableName.CHATS}.secondUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};
	public firstUser!: UserModel;
	public firstUserId!: number;
	public messages!: ChatMessageModel[];
	public secondUser!: UserModel;

	public secondUserId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.CHATS;
	}
}

export { ChatModel };
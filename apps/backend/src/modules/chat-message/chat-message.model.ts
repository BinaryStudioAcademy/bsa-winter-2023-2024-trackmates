import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";

import { UserModel } from "../users/users.js";
import { MessageStatus } from "./libs/enums/enums.js";

class ChatMessageModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			receiverUser: {
				join: {
					from: `${DatabaseTableName.CHAT_MESSAGES}.receiverId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
			selfChatMessages: {
				join: {
					from: `${DatabaseTableName.CHAT_MESSAGES}.chatId`,
					to: `${DatabaseTableName.CHAT_MESSAGES}.chatId`,
				},
				modelClass: ChatMessageModel,
				relation: Model.HasManyRelation,
			},
			senderUser: {
				join: {
					from: `${DatabaseTableName.CHAT_MESSAGES}.senderId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public chatId!: string;

	public message!: string;

	public receiverId!: number;

	public receiverUser!: UserModel;

	public senderId!: number;

	public senderUser!: UserModel;

	public status!: ValueOf<typeof MessageStatus>;

	public static override get tableName(): string {
		return DatabaseTableName.CHAT_MESSAGES;
	}
}

export { ChatMessageModel };

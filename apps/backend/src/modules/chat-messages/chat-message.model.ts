import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { UserModel } from "~/modules/users/users.js";

import { type MessageStatus } from "./libs/enums/enums.js";

class ChatMessageModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			senderUser: {
				join: {
					from: `${DatabaseTableName.CHAT_MESSAGES}.senderUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};
	public chatId!: number;
	public senderUser!: UserModel;
	public senderUserId!: number;
	public status!: ValueOf<typeof MessageStatus>;

	public text!: string;

	public static override get tableName(): string {
		return DatabaseTableName.CHAT_MESSAGES;
	}
}

export { ChatMessageModel };

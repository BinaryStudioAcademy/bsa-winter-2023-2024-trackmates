import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { UserModel } from "~/modules/users/users.js";

class NotificationModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			sourceUser: {
				join: {
					from: `${DatabaseTableName.NOTIFICATIONS}.sourceUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
			user: {
				join: {
					from: `${DatabaseTableName.NOTIFICATIONS}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public message!: string;
	public sourceUser!: UserModel;
	public sourceUserId!: number;
	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.NOTIFICATIONS;
	}
}

export { NotificationModel };

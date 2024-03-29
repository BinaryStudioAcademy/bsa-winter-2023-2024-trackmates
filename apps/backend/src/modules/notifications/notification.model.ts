import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { UserModel } from "~/modules/users/users.js";

import {
	type NotificationStatus,
	type NotificationType,
} from "./libs/enums/enums.js";

class NotificationModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
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

	public actionId!: null | number;
	public receiverUserId!: number;
	public status!: ValueOf<typeof NotificationStatus>;
	public type!: ValueOf<typeof NotificationType>;
	public user!: UserModel;
	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.NOTIFICATIONS;
	}
}

export { NotificationModel };

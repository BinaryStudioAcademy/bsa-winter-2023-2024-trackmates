import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { ActivityModel } from "~/modules/activities/activities.js";
import { UserModel } from "~/modules/users/users.js";

class ActivityLikeModel extends AbstractModel {
	public static relationMapping = (): RelationMappings => {
		return {
			activity: {
				join: {
					from: `${DatabaseTableName.ACTIVITY_LIKES}.activityId`,
					to: `${DatabaseTableName.ACTIVITIES}.id`,
				},
				modelClass: ActivityModel,
				relation: Model.BelongsToOneRelation,
			},
			notification: {
				join: {
					from: `${DatabaseTableName.ACTIVITY_LIKES}.notificationId`,
					to: `${DatabaseTableName.NOTIFICATIONS}.id`,
				},
				modelClass: ActivityModel,
				relation: Model.BelongsToOneRelation,
			},
			user: {
				join: {
					from: `${DatabaseTableName.ACTIVITY_LIKES}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public activityId!: number;

	public notificationId!: number;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.ACTIVITY_LIKES;
	}
}

export { ActivityLikeModel };

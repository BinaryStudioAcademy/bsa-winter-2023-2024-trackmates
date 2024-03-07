import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { ActivityLikeModel } from "~/modules/activity-likes/activity-likes.js";
import { CommentModel } from "~/modules/comments/comments.js";
import { UserModel } from "~/modules/users/users.js";

import { type ActivityType } from "./libs/enums/enums.js";

class ActivityModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			comments: {
				join: {
					from: `${DatabaseTableName.ACTIVITIES}.id`,
					to: `${DatabaseTableName.COMMENTS}.activityId`,
				},
				modelClass: CommentModel,
				relation: Model.HasManyRelation,
			},
			likes: {
				join: {
					from: `${DatabaseTableName.ACTIVITIES}.id`,
					to: `${DatabaseTableName.ACTIVITY_LIKES}.activityId`,
				},
				modelClass: ActivityLikeModel,
				relation: Model.HasManyRelation,
			},
			user: {
				join: {
					from: `${DatabaseTableName.ACTIVITIES}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public actionId!: number;

	public payload!: unknown;

	public time!: string;

	public type!: ValueOf<typeof ActivityType>;

	public user!: UserModel;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.ACTIVITIES;
	}
}

export { ActivityModel };

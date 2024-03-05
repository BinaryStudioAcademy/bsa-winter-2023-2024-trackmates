import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { UserModel } from "~/modules/users/users.js";

import { type ActivityTypeValue } from "./libs/enums/enums.js";

class ActivityModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			likes: {
				join: {
					from: `${DatabaseTableName.ACTIVITIES}.id`,
					to: `${DatabaseTableName.ACTIVITY_LIKES}.activityId`,
				},
				modelClass: UserModel,
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

	public type!: ValueOf<typeof ActivityTypeValue>;

	public user!: UserModel;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.ACTIVITIES;
	}
}

export { ActivityModel };

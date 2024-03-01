import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { UserModel } from "~/modules/users/users.js";

import { type ActivityType } from "./libs/types/types.js";

class ActivityModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
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

	public payload!: string;

	public time!: string;

	public type!: ActivityType;

	public user!: UserModel;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.ACTIVITIES;
	}
}

export { ActivityModel };

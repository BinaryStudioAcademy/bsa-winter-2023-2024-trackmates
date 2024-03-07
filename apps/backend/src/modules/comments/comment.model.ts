import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { UserDetailsModel } from "~/modules/users/users.js";

class CommentModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			author: {
				join: {
					from: `${DatabaseTableName.COMMENTS}.userId`,
					to: `${DatabaseTableName.USER_DETAILS}.userId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public activityId!: number;

	public author!: UserDetailsModel;

	public text!: string;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.COMMENTS;
	}
}

export { CommentModel };

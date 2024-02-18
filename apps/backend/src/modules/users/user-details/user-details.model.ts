import { Model, Modifiers, QueryBuilder } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../user.model.js";

class UserDetailsModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			user: {
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public firstName!: string;

	public lastName!: string;

	public userId!: number;

	public static override get modifiers(): Modifiers<
		QueryBuilder<UserDetailsModel>
	> {
		return {
			selectFirstNameLastName(builder): QueryBuilder<UserDetailsModel> {
				return builder.select("firstName", "lastName");
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USER_DETAILS;
	}
}

export { UserDetailsModel };

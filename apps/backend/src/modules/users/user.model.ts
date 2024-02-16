import { Model, Modifiers, QueryBuilder } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			userDetails: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.userId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.HasOneRelation,
			},
		};
	};

	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;

	public static override get modifiers(): Modifiers<QueryBuilder<UserModel>> {
		return {
			onlyId(builder): QueryBuilder<UserModel> {
				return builder.select("id");
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };

import { Model } from "objection";

import { UserModel } from "../user.model.js";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserDetailsModel extends AbstractModel {
	public firstName!: string;

	public userId!: number;

	public lastName!: string;

	public static tableName: string = DatabaseTableName.USER_DETAILS;

	public user!: UserModel;

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

	static get jsonSchema() {
		return {
			properties: {
				firstName: { type: "string" },
				userId: { type: "integer" },
				lastName: { type: "string" },
			},
			type: "object",
		};
	}
}

export { UserDetailsModel };

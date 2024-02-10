import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../user.model.js";

class UserDetailsModel extends AbstractModel {
	public firstName!: string;

	public static tableName: string = DatabaseTableName.USER_DETAILS;

	public lastName!: string;

	public userId!: number;

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

	public user!: UserModel;

	static get jsonSchema() {
		return {
			properties: {
				firstName: { type: "string" },
				lastName: { type: "string" },
				userId: { type: "integer" },
			},
			type: "object",
		};
	}
}

export { UserDetailsModel };

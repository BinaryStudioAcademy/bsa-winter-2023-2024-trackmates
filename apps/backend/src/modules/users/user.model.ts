import { Model } from "objection";

import { UserDetailsModel } from "./user-details/user-details.model.js";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserModel extends AbstractModel {
	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	static tableName: string = DatabaseTableName.USERS;

	static jsonSchema = {
		properties: {
			email: { type: "string" },
		},
		required: ["email"],
		type: "object",
	};

	public userDetails!: UserDetailsModel;

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
}

export { UserModel };

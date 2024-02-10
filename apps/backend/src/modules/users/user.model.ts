import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserModel extends AbstractModel {
	public email!: string;

	public passwordHash!: string;

	static jsonSchema = {
		properties: {
			email: { type: "string" },
		},
		required: ["email"],
		type: "object",
	};

	static tableName: string = DatabaseTableName.USERS;

	public passwordSalt!: string;

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

	public userDetails!: UserDetailsModel;
}

export { UserModel };

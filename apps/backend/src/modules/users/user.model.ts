import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { Model } from "objection";
import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserModel extends AbstractModel {
	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;

	static tableName: string = DatabaseTableName.USERS;

	static jsonSchema = {
		type: "object",
		required: ["email"],

		properties: {
			email: { type: "string" },
		},
	};

	public static relationMappings = () => {
		return {
			userDetails: {
				relation: Model.HasOneRelation,
				modelClass: UserDetailsModel,
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.userId`,
				},
			},
		};
	};
}

export { UserModel };

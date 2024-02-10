import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { Model } from "objection";
import { UserModel } from "../user.model.js";

class UserDetailsModel extends AbstractModel {
	public userId!: number;

	public firstName!: string;

	public lastName!: string;

	public user!: UserModel;

	public static tableName: string = DatabaseTableName.USER_DETAILS;

	static get jsonSchema() {
		return {
			type: "object",

			properties: {
				userId: { type: "integer" },
				firstName: { type: "string" },
				lastName: { type: "string" },
			},
		};
	}

	public static relationMappings = () => {
		return {
			user: {
				relation: Model.BelongsToOneRelation,
				modelClass: UserModel,
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
			},
		};
	};
}

export { UserDetailsModel };

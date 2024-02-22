import { Model } from "objection";

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
			userFollowers: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					through: {
						from: "user_followers.follower_id",
						to: "user_followers.following_id",
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
		};
	};

	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public userDetails!: UserDetailsModel;

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };

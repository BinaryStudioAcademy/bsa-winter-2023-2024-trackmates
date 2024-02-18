import { Model, Modifiers, QueryBuilder } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { FriendModel } from "../friends/friend.model.js";
import { UserDetailsModel } from "./user-details/user-details.model.js";

class UserModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			recipientUser: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.FRIENDS}.recipientUserId`,
				},
				modelClass: FriendModel,
				relation: Model.HasManyRelation,
			},
			senderUser: {
				join: {
					from: `${DatabaseTableName.USERS}.id`,
					to: `${DatabaseTableName.FRIENDS}.senderUserId`,
				},
				modelClass: FriendModel,
				relation: Model.HasManyRelation,
			},
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

	public friendModel!: FriendModel[];

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

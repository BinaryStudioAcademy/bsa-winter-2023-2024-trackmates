import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/user.model.js";

class FriendModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			recipientUser: {
				join: {
					from: `${DatabaseTableName.FRIENDS}.recipientUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
			senderUser: {
				join: {
					from: `${DatabaseTableName.FRIENDS}.senderUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public isFollowing!: boolean;
	public recipientUser?: UserModel;
	public recipientUserId!: number;
	public senderUser?: UserModel;
	public senderUserId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.FRIENDS;
	}
}

export { FriendModel };

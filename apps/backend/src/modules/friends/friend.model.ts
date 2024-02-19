import { Model, Modifiers, QueryBuilder } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/user.model.js";
import { UserDetailsModel } from "../users/user-details/user-details.model.js";

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

	public isInvitationAccepted!: boolean;
	public recipientUser?: UserDetailsModel;
	public recipientUserId!: number;
	public senderUser?: UserDetailsModel;
	public senderUserId!: number;

	public static override get modifiers(): Modifiers<QueryBuilder<FriendModel>> {
		return {
			getIdWithStatus(builder): QueryBuilder<FriendModel> {
				return builder.select(
					"id",
					"senderUserId",
					"recipientUserId",
					"isInvitationAccepted",
				);
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.FRIENDS;
	}
}

export { FriendModel };

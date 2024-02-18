import { Model, Modifiers, QueryBuilder } from "objection";

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

	public isInvitationAccepted!: boolean;
	public recipientUserId!: number;
	public senderUserId!: number;

	public static override get modifiers(): Modifiers<QueryBuilder<FriendModel>> {
		return {
			getIdWithStatus(builder): QueryBuilder<FriendModel> {
				return builder.select(
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

import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class FriendModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			firstUser: {
				join: {
					from: `${DatabaseTableName.FRIENDS}.firstUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: FriendModel,
				relation: Model.BelongsToOneRelation,
			},
			secondUser: {
				join: {
					from: `${DatabaseTableName.FRIENDS}.secondUserId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: FriendModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public firstUserId!: number;

	public isInvitationAccepted!: boolean;

	public secondUserId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.FRIENDS;
	}
}

export { FriendModel };

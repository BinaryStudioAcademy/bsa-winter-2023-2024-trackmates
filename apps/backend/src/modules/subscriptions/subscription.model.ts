import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { UserDetailsModel } from "~/modules/users/users.js";

class SubscriptionModel extends AbstractModel {
	public expiresAt!: string;

	public static get relationMappings(): RelationMappings {
		return {
			userDetails: {
				join: {
					from: `${DatabaseTableName.SUBSCRIPTIONS}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.subscriptionId`,
				},
				modelClass: UserDetailsModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.SUBSCRIPTIONS;
	}
}

export { SubscriptionModel };

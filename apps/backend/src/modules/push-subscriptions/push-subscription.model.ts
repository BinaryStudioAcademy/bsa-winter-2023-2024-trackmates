import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class PushSubscriptionModel extends AbstractModel {
	public authKey!: string;

	public endpoint!: string;

	public expirationTime!: null | number;

	public p256dhKey!: string;

	public static override get tableName(): string {
		return DatabaseTableName.PUSH_SUBSCRIPTIONS;
	}
}

export { PushSubscriptionModel };

import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";
import { FileModel } from "~/modules/files/file.model.js";
import { SubscriptionModel } from "~/modules/subscriptions/subscriptions.js";

import { type UserSex } from "./libs/enums/enums.js";
import { UserModel } from "./user.model.js";

class UserDetailsModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			avatarFile: {
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.avatarFileId`,
					to: `${DatabaseTableName.FILES}.id`,
				},
				modelClass: FileModel,
				relation: Model.HasOneRelation,
			},
			subscription: {
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.subscriptionId`,
					to: `${DatabaseTableName.SUBSCRIPTIONS}.id`,
				},
				modelClass: SubscriptionModel,
				relation: Model.HasOneRelation,
			},
			user: {
				join: {
					from: `${DatabaseTableName.USER_DETAILS}.userId`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public avatarFile?: FileModel;

	public avatarFileId!: number;

	public firstName!: string;

	public lastName!: string;

	public nickname!: null | string;

	public sex!: ValueOf<typeof UserSex> | null;

	public subscription?: SubscriptionModel;

	public subscriptionId!: null | number;

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.USER_DETAILS;
	}
}

export { UserDetailsModel };

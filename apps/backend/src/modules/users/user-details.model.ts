import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { FileModel } from "~/modules/files/file.model.js";

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

	public userId!: number;

	public static override get tableName(): string {
		return DatabaseTableName.USER_DETAILS;
	}
}

export { UserDetailsModel };

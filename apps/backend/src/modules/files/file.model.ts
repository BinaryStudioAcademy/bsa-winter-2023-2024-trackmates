import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { UserDetailsModel } from "~/modules/users/users.js";

class FileModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			userDetails: {
				join: {
					from: `${DatabaseTableName.FILES}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.file_id`,
				},
				modelClass: UserDetailsModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public contentType!: string;

	public url!: string;

	public static override get tableName(): string {
		return DatabaseTableName.FILES;
	}
}

export { FileModel };

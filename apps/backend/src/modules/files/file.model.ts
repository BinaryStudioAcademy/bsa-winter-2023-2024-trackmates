import { Model } from "objection";

import { ContentType } from "~/libs/enums/enums.js";
import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { UserDetailsModel } from "~/modules/users/users.js";

import { type ValueOf } from "./libs/types/types.js";

class FileModel extends AbstractModel {
	public static relationMappings = () => {
		return {
			userDetails: {
				join: {
					from: `${DatabaseTableName.FILES}.id`,
					to: `${DatabaseTableName.USER_DETAILS}.avatar_file_id`,
				},
				modelClass: UserDetailsModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public contentType!: ValueOf<typeof ContentType>;

	public url!: string;

	public static override get tableName(): string {
		return DatabaseTableName.FILES;
	}
}

export { FileModel };

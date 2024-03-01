import { Model, type RelationMappings } from "objection";
import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { PermissionModel } from "~/modules/permissions/permission.model.js";

class GroupModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			permissions: {
				join: {
					from: `${DatabaseTableName.GROUPS}.id`,
					through: {
						from: `${DatabaseTableName.GROUPS_TO_PERMISSIONS}.groupId`,
						to: `${DatabaseTableName.GROUPS_TO_PERMISSIONS}.permissionId`,
					},
					to: `${DatabaseTableName.PERMISSIONS}.id`,
				},
				modelClass: PermissionModel,
				relation: Model.ManyToManyRelation,
			},
		};
	};

	public key!: string;

	public name!: string;

	public static override get tableName(): string {
		return DatabaseTableName.GROUPS;
	}
}

export { GroupModel };

import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { PermissionModel } from "../permissions/permissions.js";
import { UserModel } from "../users/users.js";

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
			users: {
				join: {
					from: `${DatabaseTableName.GROUPS}.id`,
					through: {
						from: `${DatabaseTableName.USERS_TO_GROUPS}.groupId`,
						to: `${DatabaseTableName.USERS_TO_GROUPS}.userId`,
					},
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.ManyToManyRelation,
			},
		};
	};

	public key!: string;

	public name!: string;

	public permissions!: PermissionModel[];

	public static override get tableName(): string {
		return DatabaseTableName.GROUPS;
	}
}

export { GroupModel };

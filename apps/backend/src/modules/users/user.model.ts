import { Modifiers, QueryBuilder } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserModel extends AbstractModel {
	public email!: string;

	public passwordHash!: string;

	public passwordSalt!: string;

	public static override get modifiers(): Modifiers<QueryBuilder<UserModel>> {
		return {
			withoutPassword(builder): QueryBuilder<UserModel> {
				return builder.select("id", "email", "createdAt", "updatedAt");
			},
		};
	}

	public static override get tableName(): string {
		return DatabaseTableName.USERS;
	}
}

export { UserModel };

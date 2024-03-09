import { type Knex } from "knex";

const TABLE_NAME = "permissions";

const ColumnName = {
	KEY: "key",
	NAME: "name",
} as const;

const Row = {
	MANAGE_COURSES: {
		[ColumnName.KEY]: "manage-courses",
		[ColumnName.NAME]: "Manage courses",
	},
	MANAGE_UAM: {
		[ColumnName.KEY]: "manage-uam",
		[ColumnName.NAME]: "Manage UAM",
	},
	MANAGE_USERS: {
		[ColumnName.KEY]: "manage-users",
		[ColumnName.NAME]: "Manage users",
	},
} as const;

const PERMISSIONS = [
	Row.MANAGE_UAM,
	Row.MANAGE_USERS,
	Row.MANAGE_COURSES,
] as const;

async function up(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).insert(PERMISSIONS);
}

async function down(knex: Knex): Promise<void> {
	await knex(TABLE_NAME)
		.whereIn(
			ColumnName.KEY,
			PERMISSIONS.map((permission) => permission[ColumnName.KEY]),
		)
		.delete();
}

export { down, up };

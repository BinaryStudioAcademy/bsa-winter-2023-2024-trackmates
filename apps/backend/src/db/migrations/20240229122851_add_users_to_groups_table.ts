import { type Knex } from "knex";

const TableName = {
	GROUPS: "groups",
	USERS: "users",
	USERS_TO_GROUPS: "users_to_groups",
} as const;

const ColumnName = {
	CREATED_AT: "created_at",
	GROUP_ID: "group_id",
	ID: "id",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.USERS_TO_GROUPS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table
			.integer(ColumnName.GROUP_ID)
			.references(ColumnName.ID)
			.inTable(TableName.GROUPS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.USERS_TO_GROUPS);
}

export { down, up };

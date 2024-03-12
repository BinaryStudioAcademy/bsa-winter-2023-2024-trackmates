import { type Knex } from "knex";

const TableName = {
	GROUPS: "groups",
	GROUPS_TO_PERMISSIONS: "groups_to_permissions",
	PERMISSIONS: "permissions",
} as const;

const ColumnName = {
	CREATED_AT: "created_at",
	GROUP_ID: "group_id",
	ID: "id",
	PERMISSION_ID: "permission_id",
	UPDATED_AT: "updated_at",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.GROUPS_TO_PERMISSIONS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.GROUP_ID)
			.references(ColumnName.ID)
			.inTable(TableName.GROUPS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table
			.integer(ColumnName.PERMISSION_ID)
			.references(ColumnName.ID)
			.inTable(TableName.PERMISSIONS)
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
	await knex.schema.dropTableIfExists(TableName.GROUPS_TO_PERMISSIONS);
}

export { down, up };

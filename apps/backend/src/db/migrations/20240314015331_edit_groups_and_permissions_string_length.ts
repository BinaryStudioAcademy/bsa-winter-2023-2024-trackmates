import { type Knex } from "knex";

const TableName = {
	GROUPS: "groups",
	PERMISSIONS: "permissions",
} as const;

const ColumnName = {
	KEY: "key",
	NAME: "name",
} as const;

const STRING_NEW_LENGTH = 20;
const STRING_OLD_LENGTH = 50;

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.GROUPS, (table) => {
		table.string(ColumnName.KEY, STRING_NEW_LENGTH).notNullable().alter();
		table.string(ColumnName.NAME, STRING_NEW_LENGTH).notNullable().alter();
	});

	await knex.schema.alterTable(TableName.PERMISSIONS, (table) => {
		table.string(ColumnName.KEY, STRING_NEW_LENGTH).notNullable().alter();
		table.string(ColumnName.NAME, STRING_NEW_LENGTH).notNullable().alter();
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.GROUPS, (table) => {
		table.string(ColumnName.KEY, STRING_OLD_LENGTH).notNullable().alter();
		table.string(ColumnName.NAME, STRING_OLD_LENGTH).notNullable().alter();
	});

	await knex.schema.alterTable(TableName.PERMISSIONS, (table) => {
		table.string(ColumnName.KEY, STRING_OLD_LENGTH).notNullable().alter();
		table.string(ColumnName.NAME, STRING_OLD_LENGTH).notNullable().alter();
	});
}

export { down, up };

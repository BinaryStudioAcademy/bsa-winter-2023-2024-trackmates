import { type Knex } from "knex";

const TableName = {
	GROUPS: "groups",
	PERMISSIONS: "permissions",
} as const;

const ColumnName = {
	KEY: "key",
	NAME: "name",
} as const;

const StringLength = {
	NEW_VALUE: 20,
	OLD_VALUE: 50,
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.GROUPS, (table) => {
		table.string(ColumnName.KEY, StringLength.NEW_VALUE).notNullable().alter();
		table.string(ColumnName.NAME, StringLength.NEW_VALUE).notNullable().alter();
	});

	await knex.schema.alterTable(TableName.PERMISSIONS, (table) => {
		table.string(ColumnName.KEY, StringLength.NEW_VALUE).notNullable().alter();
		table.string(ColumnName.NAME, StringLength.NEW_VALUE).notNullable().alter();
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.GROUPS, (table) => {
		table.string(ColumnName.KEY, StringLength.OLD_VALUE).notNullable().alter();
		table.string(ColumnName.NAME, StringLength.OLD_VALUE).notNullable().alter();
	});

	await knex.schema.alterTable(TableName.PERMISSIONS, (table) => {
		table.string(ColumnName.KEY, StringLength.OLD_VALUE).notNullable().alter();
		table.string(ColumnName.NAME, StringLength.OLD_VALUE).notNullable().alter();
	});
}

export { down, up };

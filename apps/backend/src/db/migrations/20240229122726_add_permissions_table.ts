import { type Knex } from "knex";

const TABLE_NAME = "permissions";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	KEY: "key",
	NAME: "name",
	UPDATED_AT: "updated_at",
} as const;

const STRING_LENGTH = 50;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.NAME, STRING_LENGTH).unique().notNullable();
		table.string(ColumnName.KEY, STRING_LENGTH).unique().notNullable();
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
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

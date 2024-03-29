import { type Knex } from "knex";

const TABLE_NAME = "vendors";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	KEY: "key",
	NAME: "name",
	UPDATED_AT: "updated_at",
	URL: "url",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.NAME).notNullable();
		table.string(ColumnName.KEY).unique().notNullable();
		table.string(ColumnName.URL).notNullable();
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

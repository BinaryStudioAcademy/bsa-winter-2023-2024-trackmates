import { type Knex } from "knex";

const TABLE_NAME = "courses";

const ColumnName = {
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	ID: "id",
	TITLE: "title",
	UPDATED_AT: "updated_at",
	URL: "url",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.text(ColumnName.URL).notNullable();
		table.text(ColumnName.TITLE).notNullable();
		table.text(ColumnName.DESCRIPTION);
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

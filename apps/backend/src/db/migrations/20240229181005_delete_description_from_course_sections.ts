import { type Knex } from "knex";

const TABLE_NAME = "course_sections";

const COLUMN_NAME = "description";

function up(knex: Knex): Promise<void> {
	return knex.schema.table(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.table(TABLE_NAME, (table) => {
		table.text(COLUMN_NAME);
	});
}

export { down, up };

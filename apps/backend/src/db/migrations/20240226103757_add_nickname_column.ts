import { type Knex } from "knex";

const TABLE_NAME = "user_details";

const COLUMN_NAME = "nickname";

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.text(COLUMN_NAME).unique().defaultTo(null);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

export { down, up };

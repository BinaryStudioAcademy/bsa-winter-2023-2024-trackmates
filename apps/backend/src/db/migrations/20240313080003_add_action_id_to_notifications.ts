import { type Knex } from "knex";

const TABLE_NAME = "notifications";

const COLUMN_NAME = "action_id";

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.integer(COLUMN_NAME).defaultTo(null);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

export { down, up };

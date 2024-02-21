import { type Knex } from "knex";

const TABLE_NAME = "vendors";

async function up(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).del();
	await knex(TABLE_NAME).insert([{ key: "udemy", name: "Udemy" }]);
}

async function down(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).del();
}

export { down, up };

import { Knex } from "knex";

const TABLE_NAME = "vendors";

async function seed(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).del();

	await knex(TABLE_NAME).insert([{ id: 1, key: "udemy", name: "Udemy" }]);
}

export { seed };

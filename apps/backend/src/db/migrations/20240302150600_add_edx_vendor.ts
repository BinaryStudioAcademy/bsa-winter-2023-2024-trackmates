import { type Knex } from "knex";

const TABLE_NAME = "vendors";

const KEY_COLUMN = "key";

const ROW = { key: "edx", name: "edX", url: "https://www.edx.org" };

async function up(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).insert([ROW]);
}

async function down(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).where(KEY_COLUMN, ROW[KEY_COLUMN]).del();
}

export { down, up };

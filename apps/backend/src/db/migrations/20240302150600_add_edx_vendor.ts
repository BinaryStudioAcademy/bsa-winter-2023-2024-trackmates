import { type Knex } from "knex";

const TableName = "vendors";

const KEY_COLUMN = "key";
const row = { key: "edx", name: "edX", url: "https://www.edx.org" };

async function up(knex: Knex): Promise<void> {
	await knex(TableName).insert([row]);
}

async function down(knex: Knex): Promise<void> {
	await knex(TableName).where(KEY_COLUMN, row[KEY_COLUMN]).del();
}

export { down, up };

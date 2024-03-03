import { type Knex } from "knex";

const TABLE_NAME = "vendors";

const KEY_COLUMN = "key";
const Row = { key: "edx", name: "edX", url: "https://www.edx.org" } as const;

async function up(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).insert([Row]);
}

async function down(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).where(KEY_COLUMN, Row[KEY_COLUMN]).del();
}

export { down, up };

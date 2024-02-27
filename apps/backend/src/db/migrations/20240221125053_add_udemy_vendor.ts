import { type Knex } from "knex";

const TableName = {
	COURSES: "courses",
	COURSES_TO_USERS: "courses_to_users",
	VENDORS: "vendors",
};

const KEY_COLUMN = "key";
const row = { key: "udemy", name: "Udemy", url: "https://www.udemy.com" };

async function up(knex: Knex): Promise<void> {
	await knex(TableName.VENDORS).insert([row]);
}

async function down(knex: Knex): Promise<void> {
	await knex(TableName.VENDORS).where(KEY_COLUMN, row[KEY_COLUMN]).del();
}

export { down, up };

import { type Knex } from "knex";

const TableName = {
	COURSES: "courses",
	COURSES_TO_USERS: "courses_to_users",
	VENDORS: "vendors",
};

async function up(knex: Knex): Promise<void> {
	await knex(TableName.COURSES_TO_USERS).del();
	await knex(TableName.COURSES).del();
	await knex(TableName.VENDORS).del();
	await knex(TableName.VENDORS).insert([{ key: "udemy", name: "Udemy" }]);
}

async function down(knex: Knex): Promise<void> {
	await knex(TableName.VENDORS).del();
}

export { down, up };

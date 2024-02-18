import { type Knex } from "knex";

const TABLE_NAME = "courses_to_users";
const COURSES_TABLE_NAME = "courses";
const USERS_TABLE_NAME = "users";
const ID = "id";

const ColumnName = {
	COURSE_ID: "course_id",
	CREATED_AT: "created_at",
	ID: "id",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.COURSE_ID)
			.references(ID)
			.inTable(COURSES_TABLE_NAME)
			.notNullable()
			.unique();

		table
			.integer(ColumnName.USER_ID)
			.references(ID)
			.inTable(USERS_TABLE_NAME)
			.notNullable()
			.unique();

		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

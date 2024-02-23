import { type Knex } from "knex";

const ColumnName = {
	COURSE_ID: "course_id",
	CREATED_AT: "created_at",
	ID: "id",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const TableName = {
	COURSES: "courses",
	COURSES_TO_USERS: "courses_to_users",
	USERS: "users",
};

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.COURSES_TO_USERS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.COURSE_ID)
			.references(ColumnName.ID)
			.inTable(TableName.COURSES)
			.onDelete("CASCADE")
			.notNullable();
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.onDelete("CASCADE")
			.notNullable();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table.unique([ColumnName.COURSE_ID, ColumnName.USER_ID], {
			indexName: "course_id_user_id_index",
			useConstraint: true,
		});
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.COURSES_TO_USERS);
}

export { down, up };

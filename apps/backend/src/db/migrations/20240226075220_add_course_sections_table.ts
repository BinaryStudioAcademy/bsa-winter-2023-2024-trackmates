import { type Knex } from "knex";

const TableName = {
	COURSE_SECTIONS: "course_sections",
	COURSES: "courses",
} as const;

const ColumnName = {
	COURSE_ID: "course_id",
	CREATED_AT: "created_at",
	ID: "id",
	TITLE: "title",
	UPDATED_AT: "updated_at",
} as const;

const DELETE_STRATEGY = "CASCADE";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.COURSE_SECTIONS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.COURSE_ID)
			.references(ColumnName.ID)
			.inTable(TableName.COURSES)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table.text(ColumnName.TITLE);
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

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.COURSE_SECTIONS);
}

export { down, up };

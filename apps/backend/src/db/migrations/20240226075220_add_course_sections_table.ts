import { type Knex } from "knex";

const TABLE_NAME = {
	COURSE_SECTIONS: "course_sections",
	COURSES: "courses",
};

const ColumnName = {
	COURSE_ID: "course_id",
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	ID: "id",
	TITLE: "title",
	UPDATED_AT: "updated_at",
} as const;

const DELETE_STRATEGY = "CASCADE";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME.COURSE_SECTIONS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.COURSE_ID)
			.references(ColumnName.ID)
			.inTable(TABLE_NAME.COURSES)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table.text(ColumnName.DESCRIPTION);
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
	return knex.schema.dropTableIfExists(TABLE_NAME.COURSE_SECTIONS);
}

export { down, up };

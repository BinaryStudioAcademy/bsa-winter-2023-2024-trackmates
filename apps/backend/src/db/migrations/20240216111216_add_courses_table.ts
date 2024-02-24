import { type Knex } from "knex";

const DELETE_STRATEGY = "CASCADE";

const ColumnName = {
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	ID: "id",
	IMAGE: "image",
	TITLE: "title",
	UPDATED_AT: "updated_at",
	URL: "url",
	VENDOR_COURSE_ID: "vendor_course_id",
	VENDOR_ID: "vendor_id",
} as const;

const TableName = {
	COURSES: "courses",
	VENDORS: "vendors",
};

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.COURSES, (table) => {
		table.increments(ColumnName.ID).primary();
		table.text(ColumnName.TITLE).notNullable();
		table.text(ColumnName.DESCRIPTION);
		table.text(ColumnName.IMAGE);
		table.text(ColumnName.URL).notNullable();
		table.string(ColumnName.VENDOR_COURSE_ID).notNullable().unique();
		table
			.integer(ColumnName.VENDOR_ID)
			.references(ColumnName.ID)
			.inTable(TableName.VENDORS)
			.onDelete(DELETE_STRATEGY);
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
	await knex.schema.dropTableIfExists(TableName.COURSES);
}

export { down, up };

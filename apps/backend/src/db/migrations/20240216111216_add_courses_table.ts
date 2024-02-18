import { type Knex } from "knex";

const TABLE_NAME = "courses";
const VENDORS_TABLE_NAME = "vendors";
const VENDOR_ID = "id";

const ColumnName = {
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	ID: "id",
	IMAGE: "image",
	IMAGE_SMALL: "imageSmall",
	TITLE: "title",
	UPDATED_AT: "updated_at",
	URL: "url",
	VENDOR_COURSE_ID: "vendor_course_id",
	VENDOR_ID: "vendor_id",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.text(ColumnName.TITLE).notNullable();
		table.text(ColumnName.DESCRIPTION);
		table.text(ColumnName.IMAGE);
		table.text(ColumnName.IMAGE_SMALL);
		table.text(ColumnName.URL).notNullable();
		table.string(ColumnName.VENDOR_COURSE_ID).notNullable().unique();
		table
			.integer(ColumnName.VENDOR_ID)
			.references(VENDOR_ID)
			.inTable(VENDORS_TABLE_NAME);
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

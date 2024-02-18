import { type Knex } from "knex";

const TABLE_NAME = "files";

const DETAILS_TABLE_NAME = "user_details";

const ColumnName = {
	CONTENT_TYPE: "content_type",
	CREATED_AT: "created_at",
	ID: "id",
	UPDATED_AT: "updated_at",
	URL: "url",
} as const;

const DetailsColumnName = {
	AVATAR_FILE_ID: "avatar_file_id",
};

function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable(TABLE_NAME, (table) => {
			table.increments(ColumnName.ID).primary();
			table.string(ColumnName.URL);
			table.enum(ColumnName.CONTENT_TYPE, ["image/jpeg", "image/png"]);
			table
				.dateTime(ColumnName.CREATED_AT)
				.notNullable()
				.defaultTo(knex.fn.now());
			table
				.dateTime(ColumnName.UPDATED_AT)
				.notNullable()
				.defaultTo(knex.fn.now());
		})
		.table(DETAILS_TABLE_NAME, (table) => {
			table
				.integer(DetailsColumnName.AVATAR_FILE_ID)
				.unique()
				.references("id")
				.inTable(TABLE_NAME);
		});
}

function down(knex: Knex): Promise<void> {
	return knex.schema
		.table(DETAILS_TABLE_NAME, (table) => {
			table.dropColumn(DetailsColumnName.AVATAR_FILE_ID);
		})
		.dropTableIfExists(TABLE_NAME);
}

export { down, up };

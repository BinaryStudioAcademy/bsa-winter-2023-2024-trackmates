import { type Knex } from "knex";

const TableName = {
	DETAILS_TABLE_NAME: "user_details",
	FILES: "files",
};

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
		.createTable(TableName.FILES, (table) => {
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
		.table(TableName.DETAILS_TABLE_NAME, (table) => {
			table
				.integer(DetailsColumnName.AVATAR_FILE_ID)
				.unique()
				.references(ColumnName.ID)
				.inTable(TableName.FILES);
		});
}

function down(knex: Knex): Promise<void> {
	return knex.schema
		.table(TableName.DETAILS_TABLE_NAME, (table) => {
			table.dropColumn(DetailsColumnName.AVATAR_FILE_ID);
		})
		.dropTableIfExists(TableName.FILES);
}

export { down, up };

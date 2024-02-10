import { type Knex } from "knex";

const TABLE_NAME = "user_details";

const ColumnName = {
	CREATED_AT: "created_at",
	USER_ID: "user_id",
	ID: "id",
	FISRT_NAME: "first_name",
	LAST_NAME: "last_name",
	UPDATED_AT: "updated_at",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.integer(ColumnName.USER_ID).references("id").inTable("users");
		table.text(ColumnName.FISRT_NAME);
		table.text(ColumnName.LAST_NAME);
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
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

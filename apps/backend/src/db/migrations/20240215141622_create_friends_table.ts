import { type Knex } from "knex";

const TABLE_NAME = "friends";

const ColumnName = {
	CREATED_AT: "created_at",
	FIRST_USER_ID: "first_user_id",
	ID: "id",
	IS_INVITATION_ACCEPTED: "is_invitation_accepted",
	SECOND_USER_ID: "second_user_id",
	UPDATED_AT: "updated_at",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.integer(ColumnName.FIRST_USER_ID)
			.references("id")
			.inTable("users")
			.notNullable()
			.onDelete("CASCADE");
		table
			.integer(ColumnName.SECOND_USER_ID)
			.references("id")
			.inTable("users")
			.notNullable()
			.onDelete("CASCADE");
		table
			.boolean(ColumnName.IS_INVITATION_ACCEPTED)
			.notNullable()
			.defaultTo(false);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

import { type Knex } from "knex";

const TABLE_NAME = "friends";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	IS_INVITATION_ACCEPTED: "is_invitation_accepted",
	RECIPIENT_USER_ID: "recipient_user_id",
	SENDER_USER_ID: "sender_user_id",
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
			.integer(ColumnName.SENDER_USER_ID)
			.references("id")
			.inTable("users")
			.notNullable()
			.onDelete("CASCADE");
		table
			.integer(ColumnName.RECIPIENT_USER_ID)
			.references("id")
			.inTable("users")
			.notNullable()
			.onDelete("CASCADE");
		table.boolean(ColumnName.IS_INVITATION_ACCEPTED).nullable().defaultTo(null);
		table.unique([ColumnName.SENDER_USER_ID, ColumnName.RECIPIENT_USER_ID]);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

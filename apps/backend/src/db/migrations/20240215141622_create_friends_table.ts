import { type Knex } from "knex";

const TABLE_NAME = {
	FRIENDS: "friends",
	USERS: "users",
};

const DELETE_STRATEGY = "CASCADE";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	IS_FOLLOWING: "is_following",
	RECIPIENT_USER_ID: "recipient_user_id",
	SENDER_USER_ID: "sender_user_id",
	UPDATED_AT: "updated_at",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAME.FRIENDS, (table) => {
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
			.references(ColumnName.ID)
			.inTable(TABLE_NAME.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table
			.integer(ColumnName.RECIPIENT_USER_ID)
			.references(ColumnName.ID)
			.inTable(TABLE_NAME.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table.boolean(ColumnName.IS_FOLLOWING).notNullable().defaultTo(true);
		table.unique([ColumnName.SENDER_USER_ID, ColumnName.RECIPIENT_USER_ID]);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAME.FRIENDS);
}

export { down, up };

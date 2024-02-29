import { type Knex } from "knex";

const TableName = {
	CHATS: "chats",
	USERS: "users",
} as const;

const ColumnName = {
	CREATED_AT: "created_at",
	FIRST_USER_ID: "first_user_id",
	ID: "id",
	SECOND_USER_ID: "second_user_id",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.CHATS, (table) => {
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
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.USERS);
		table
			.integer(ColumnName.SECOND_USER_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.USERS);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.CHATS);
}

export { down, up };

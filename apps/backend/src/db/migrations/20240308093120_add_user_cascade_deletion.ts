import { type Knex } from "knex";

const TableName = {
	CHAT_MESSAGES: "chat_messages",
	CHATS: "chats",
	USER_DETAILS: "user_details",
	USERS: "users",
} as const;

const ColumnName = {
	FIRST_USER_ID: "first_user_id",
	ID: "id",
	SECOND_USER_ID: "second_user_id",
	SENDER_USER_ID: "sender_user_id",
	USER_ID: "user_id",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table.dropForeign(ColumnName.USER_ID);

		table
			.foreign(ColumnName.USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`)
			.onDelete(DELETE_STRATEGY);
	});

	await knex.schema.alterTable(TableName.CHATS, (table) => {
		table.dropForeign(ColumnName.FIRST_USER_ID);
		table.dropForeign(ColumnName.SECOND_USER_ID);

		table
			.foreign(ColumnName.FIRST_USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`)
			.onDelete(DELETE_STRATEGY);
		table
			.foreign(ColumnName.SECOND_USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`)
			.onDelete(DELETE_STRATEGY);
	});

	await knex.schema.alterTable(TableName.CHAT_MESSAGES, (table) => {
		table.dropForeign(ColumnName.SENDER_USER_ID);

		table
			.foreign(ColumnName.SENDER_USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`)
			.onDelete(DELETE_STRATEGY);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table.dropForeign(ColumnName.USER_ID);

		table
			.foreign(ColumnName.USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`);
	});

	await knex.schema.alterTable(TableName.CHATS, (table) => {
		table.dropForeign(ColumnName.FIRST_USER_ID);
		table.dropForeign(ColumnName.SECOND_USER_ID);

		table
			.foreign(ColumnName.FIRST_USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`);
		table
			.foreign(ColumnName.SECOND_USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`);
	});

	await knex.schema.alterTable(TableName.CHAT_MESSAGES, (table) => {
		table.dropForeign(ColumnName.SENDER_USER_ID);

		table
			.foreign(ColumnName.SENDER_USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`);
	});
}

export { down, up };

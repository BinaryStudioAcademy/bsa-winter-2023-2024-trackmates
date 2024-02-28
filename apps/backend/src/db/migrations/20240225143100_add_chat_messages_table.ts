import { type Knex } from "knex";

const DELETE_STRATEGY = "CASCADE";

const MessageStatus = {
	READ: "read",
	UNREAD: "unread",
} as const;

const TableName = {
	CHAT_MESSAGES: "chat_messages",
	CHATS: "chats",
	USERS: "users",
} as const;

const ColumnName = {
	CHAT_ID: "chat_id",
	CREATED_AT: "created_at",
	ID: "id",
	SENDER_USER_ID: "sender_user_id",
	STATUS: "status",
	TEXT: "text",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.CHAT_MESSAGES, (table) => {
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
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.USERS);
		table
			.integer(ColumnName.CHAT_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.CHATS)
			.onDelete(DELETE_STRATEGY);
		table
			.enum(ColumnName.STATUS, [MessageStatus.READ, MessageStatus.UNREAD])
			.notNullable()
			.defaultTo(MessageStatus.UNREAD);
		table.text(ColumnName.TEXT).notNullable();
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.CHAT_MESSAGES);
}

export { down, up };

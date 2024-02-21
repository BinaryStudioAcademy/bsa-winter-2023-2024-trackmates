import { type Knex } from "knex";

import { MessageStatus } from "~/modules/chat-message/libs/enums/enums.js";

const TABLE_NAME = "chat_messages";

const ColumnName = {
	CHAT_ID: "chat_id",
	CREATED_AT: "created_at",
	ID: "id",
	MESSAGE: "message",
	RECEIVER_ID: "receiver_id",
	SENDER_ID: "sender_id",
	STATUS: "status",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
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
			.integer(ColumnName.SENDER_ID)
			.notNullable()
			.references("id")
			.inTable("users");
		table
			.integer(ColumnName.RECEIVER_ID)
			.notNullable()
			.references("id")
			.inTable("users");
		table.uuid(ColumnName.CHAT_ID).notNullable().defaultTo(knex.fn.uuid());
		table
			.enum(ColumnName.STATUS, [MessageStatus.READ, MessageStatus.UNREAD])
			.notNullable()
			.defaultTo(MessageStatus.UNREAD);
		table.text(ColumnName.MESSAGE).notNullable();
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

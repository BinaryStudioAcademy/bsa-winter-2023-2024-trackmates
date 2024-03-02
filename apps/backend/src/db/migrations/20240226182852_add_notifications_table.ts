import { type Knex } from "knex";

const TableName = {
	NOTIFICATIONS: "notifications",
	USERS: "users",
} as const;

const NotificationStatus = {
	READ: "read",
	UNREAD: "unread",
} as const;

const DELETE_STRATEGY = "CASCADE";

const ColumnName = {
	CREATED_AT: "created_at",
	ID: "id",
	MESSAGE: "message",
	RECEIVER_USER_ID: "receiver_user_id",
	STATUS: "status",
	TYPE: "type",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.NOTIFICATIONS, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.MESSAGE);
		table
			.integer(ColumnName.RECEIVER_USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS);
		table
			.enum(ColumnName.STATUS, [
				NotificationStatus.READ,
				NotificationStatus.UNREAD,
			])
			.defaultTo(NotificationStatus.UNREAD)
			.notNullable();
		table.enum(ColumnName.TYPE, ["new_follower"]).notNullable();
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
	return knex.schema.dropTableIfExists(TableName.NOTIFICATIONS);
}

export { down, up };

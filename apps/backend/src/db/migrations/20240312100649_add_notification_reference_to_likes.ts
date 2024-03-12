import { type Knex } from "knex";

const TableName = {
	ACTIVITY_LIKES: "activity_likes",
	NOTIFICATIONS: "notifications",
} as const;

const ColumnName = {
	ID: "id",
	NOTIFICATION_ID: "notification_id",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.ACTIVITY_LIKES, (table) => {
		table
			.integer(ColumnName.NOTIFICATION_ID)
			.references(ColumnName.ID)
			.inTable(TableName.NOTIFICATIONS)
			.onDelete(DELETE_STRATEGY);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.ACTIVITY_LIKES, (table) => {
		table.dropColumn(ColumnName.NOTIFICATION_ID);
	});
}

export { down, up };

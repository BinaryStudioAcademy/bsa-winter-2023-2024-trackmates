import { type Knex } from "knex";

const TABLE_NAME = "notifications";

const NotificationType = {
	NEW_COMMENT: "new-comment",
	NEW_FOLLOWER: "new-follower",
	NEW_LIKE: "new-like",
} as const;

const COLUMN_NAME = "type";

const CHECK_NAME = "notifications_type_check";

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropChecks(CHECK_NAME);
	});

	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table
			.string(COLUMN_NAME)
			.checkIn(Object.values(NotificationType), CHECK_NAME)
			.notNullable()
			.alter();
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropChecks(CHECK_NAME);
	});

	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table
			.string(COLUMN_NAME)
			.checkIn([NotificationType.NEW_FOLLOWER], CHECK_NAME)
			.notNullable()
			.alter();
	});
}

export { down, up };

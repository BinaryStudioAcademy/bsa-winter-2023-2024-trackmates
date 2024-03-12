import { type Knex } from "knex";

const TABLE_NAME = "notifications";

const NotificationType = {
	NEW_COMMENT: "new-comment",
	NEW_FOLLOWER: "new-follower",
	NEW_LIKE: "new-like",
} as const;

const NOTIFICATION_TYPES = Object.values(NotificationType)
	.map((type) => {
		return `'${type}'`;
	})
	.join(", ");

const COLUMN_NAME = "type";

const CHECK_NAME = "notifications_type_check";

async function up(knex: Knex): Promise<void> {
	await knex.schema.raw(
		`ALTER TABLE ${TABLE_NAME} DROP CONSTRAINT IF EXISTS ${CHECK_NAME}`,
	);

	await knex.schema.raw(
		`ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT ${CHECK_NAME} CHECK (${COLUMN_NAME} = ANY (ARRAY[${NOTIFICATION_TYPES}]))`,
	);
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.raw(
		`ALTER TABLE ${TABLE_NAME} DROP CONSTRAINT IF EXISTS ${CHECK_NAME}`,
	);

	await knex.schema.raw(
		`ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT ${CHECK_NAME} CHECK (${COLUMN_NAME} = '${NotificationType.NEW_FOLLOWER}')`,
	);
}

export { down, up };

import { type Knex } from "knex";

const TABLE_NAME = "push_subscriptions";

const ColumnName = {
	AUTH_KEY: "auth_key",
	CREATED_AT: "created_at",
	ENDPOINT: "endpoint",
	EXPIRATION_TIME: "expiration_time",
	ID: "id",
	P256DH_KEY: "p256dh_key",
	TEXT: "text",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.AUTH_KEY).unique().notNullable();
		table.string(ColumnName.P256DH_KEY).unique().notNullable();
		table.integer(ColumnName.EXPIRATION_TIME);
		table.string(ColumnName.ENDPOINT).notNullable();
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

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };

import { type Knex } from "knex";

const TableName = {
	SUBSCRIPTIONS: "subscriptions",
	USER_DETAILS: "user_details",
} as const;

const ColumnName = {
	ID: "id",
	SUBSCRIPTION_ID: "subscription_id",
} as const;

const DELETE_STRATEGY = "SET NULL";

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table
			.integer(ColumnName.SUBSCRIPTION_ID)
			.references(ColumnName.ID)
			.inTable(TableName.SUBSCRIPTIONS)
			.unique()
			.nullable()
			.onDelete(DELETE_STRATEGY);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table.dropColumn(ColumnName.SUBSCRIPTION_ID);
	});
}

export { down, up };

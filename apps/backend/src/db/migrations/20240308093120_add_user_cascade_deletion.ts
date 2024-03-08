import { type Knex } from "knex";

const TableName = {
	USER_DETAILS: "user_details",
	USERS: "users",
} as const;

const ColumnName = {
	ID: "id",
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
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
		table.dropForeign(ColumnName.USER_ID);

		table
			.foreign(ColumnName.USER_ID)
			.references(`${TableName.USERS}.${ColumnName.ID}`);
	});
}

export { down, up };

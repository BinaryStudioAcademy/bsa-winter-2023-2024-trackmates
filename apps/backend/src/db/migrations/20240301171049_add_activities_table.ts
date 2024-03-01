import { type Knex } from "knex";

const TableName = {
	ACTIVITIES: "activities",
	USERS: "users",
} as const;

const ColumnName = {
	ACTION_ID: "action_id",
	CREATED_AT: "created_at",
	ID: "id",
	PAYLOAD: "payload",
	TYPE: "type",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const columnTypeValues = ["FINISH_COURSE", "FINISH_SECTION"];

const DELETE_STRATEGY = "CASCADE";

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.ACTIVITIES, (table) => {
		table.increments(ColumnName.ID).primary();
		table.integer(ColumnName.ACTION_ID).notNullable();
		table.text(ColumnName.PAYLOAD);
		table.enu(ColumnName.TYPE, columnTypeValues);
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
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
	return knex.schema.dropTableIfExists(TableName.ACTIVITIES);
}

export { down, up };

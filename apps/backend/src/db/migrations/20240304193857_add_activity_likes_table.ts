import type { Knex } from "knex";

const TableName = {
	ACTIVITIES: "activities",
	ACTIVITY_LIKES: "activity_likes",
	USERS: "users",
} as const;

const ColumnName = {
	ACTIVITY_ID: "activity_id",
	ID: "id",
	CREATED_AT: "created_at",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.ACTIVITY_LIKES, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table
			.integer(ColumnName.ACTIVITY_ID)
			.references(ColumnName.ID)
			.inTable(TableName.ACTIVITIES)
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

async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.ACTIVITY_LIKES);
}

export { down, up };

import { type Knex } from "knex";

const TableName = {
	ACTIVITIES: "activities",
	COMMENTS: "comments",
	USERS: "users",
} as const;

const ColumnName = {
	ACTIVITY_ID: "activity_id",
	CREATED_AT: "created_at",
	ID: "id",
	TEXT: "text",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const up = (knex: Knex): Promise<void> => {
	return knex.schema.createTable(TableName.COMMENTS, (table) => {
		table.increments(ColumnName.ID).primary();
		table.text(ColumnName.TEXT).notNullable();
		table
			.integer(ColumnName.USER_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.USERS);
		table
			.integer(ColumnName.ACTIVITY_ID)
			.notNullable()
			.references(ColumnName.ID)
			.inTable(TableName.ACTIVITIES);
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
};

const down = (knex: Knex): Promise<void> => {
	return knex.schema.dropTableIfExists(TableName.COMMENTS);
};

export { down, up };

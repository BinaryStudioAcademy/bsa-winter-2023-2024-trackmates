import { type Knex } from "knex";

const TableName = {
	FRIENDS: "friends",
	USERS: "users",
} as const;

const DELETE_STRATEGY = "CASCADE";

const ColumnName = {
	CREATED_AT: "created_at",
	FOLLOWER_ID: "follower_id",
	FOLLOWING_ID: "following_id",
	ID: "id",
	UPDATED_AT: "updated_at",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TableName.FRIENDS, (table) => {
		table.increments(ColumnName.ID).primary();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.integer(ColumnName.FOLLOWER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table
			.integer(ColumnName.FOLLOWING_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table.unique([ColumnName.FOLLOWER_ID, ColumnName.FOLLOWING_ID]);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TableName.FRIENDS);
}

export { down, up };

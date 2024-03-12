import { type Knex } from "knex";

const TABLE_NAME = "chats";

const INDEX_NAME = "unique_users_combination_index";

const ColumnName = {
	FIRST_USER_ID: "first_user_id",
	SECOND_USER_ID: "second_user_id",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.raw(`CREATE UNIQUE INDEX ${INDEX_NAME} ON ${TABLE_NAME}
			(LEAST(${ColumnName.FIRST_USER_ID}, ${ColumnName.SECOND_USER_ID}), GREATEST(${ColumnName.SECOND_USER_ID}, ${ColumnName.FIRST_USER_ID}));`);
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropIndex(INDEX_NAME);
	});
}

export { down, up };

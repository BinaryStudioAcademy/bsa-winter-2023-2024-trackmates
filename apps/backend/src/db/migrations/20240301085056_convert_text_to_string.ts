import { type Knex } from "knex";

import { UserValidationRule } from "~/modules/users/users.js";

const TableName = "user_details";

const ColumnName = {
	FIRST_NAME: "first_name",
	LAST_NAME: "last_name",
	NICKNAME: "nickname",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName, (table) => {
		table
			.string(
				ColumnName.FIRST_NAME,
				UserValidationRule.FIRST_NAME_MAXIMUM_LENGTH,
			)
			.alter();
		table
			.string(ColumnName.LAST_NAME, UserValidationRule.LAST_NAME_MAXIMUM_LENGTH)
			.alter();
		table
			.string(ColumnName.NICKNAME, UserValidationRule.NICKNAME_MAXIMUM_LENGTH)
			.alter();
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName, (table) => {
		table.text(ColumnName.FIRST_NAME).alter();
		table.text(ColumnName.LAST_NAME).alter();
		table.text(ColumnName.NICKNAME).alter();
	});
}

export { down, up };

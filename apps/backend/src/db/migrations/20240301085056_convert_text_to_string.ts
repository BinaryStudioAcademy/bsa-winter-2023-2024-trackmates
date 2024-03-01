import { type Knex } from "knex";

const TableName = "user_details";

const ColumnName = {
	FIRST_NAME: "first_name",
	LAST_NAME: "last_name",
	NICKNAME: "nickname",
} as const;

const ValidationRule = {
	FIRST_NAME_MAXIMUM_LENGTH: 35,
	LAST_NAME_MAXIMUM_LENGTH: 35,
	NICKNAME_MAXIMUM_LENGTH: 35,
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TableName, (table) => {
		table
			.string(ColumnName.FIRST_NAME, ValidationRule.FIRST_NAME_MAXIMUM_LENGTH)
			.alter();
		table
			.string(ColumnName.LAST_NAME, ValidationRule.LAST_NAME_MAXIMUM_LENGTH)
			.alter();
		table
			.string(ColumnName.NICKNAME, ValidationRule.NICKNAME_MAXIMUM_LENGTH)
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

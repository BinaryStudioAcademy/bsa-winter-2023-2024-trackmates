import { type Knex } from "knex";

const TABLE_NAME = "user_details";

const COLUMN_NAME = "sex";

const UserSex = {
	FEMALE: "female",
	MALE: "male",
	PREFER_NOT_TO_SAY: "prefer-not-to-say",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.enum(COLUMN_NAME, Object.values(UserSex)).defaultTo(null);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

export { down, up };

import { type Knex } from "knex";

const TABLE_NAME = "user_details";

const COLUMN_NAME = "sex";

const UserSex = {
	FEMALE: "Female",
	MALE: "Male",
	PREFER_NOT_TO_SAY: "Prefer not to say",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table
			.enum(COLUMN_NAME, [
				UserSex.FEMALE,
				UserSex.MALE,
				UserSex.PREFER_NOT_TO_SAY,
			])
			.defaultTo(null);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable(TABLE_NAME, (table) => {
		table.dropColumn(COLUMN_NAME);
	});
}

export { down, up };

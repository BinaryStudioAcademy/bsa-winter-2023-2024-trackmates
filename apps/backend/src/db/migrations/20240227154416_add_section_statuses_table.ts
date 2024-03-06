import { type Knex } from "knex";

const TableName = {
	COURSE_SECTIONS: "course_sections",
	SECTION_STATUSES: "section_statuses",
	USERS: "users",
} as const;

const ColumnName = {
	COURSE_SECTION_ID: "course_section_id",
	CREATED_AT: "created_at",
	ID: "id",
	STATUS: "status",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
} as const;

const StatusValue = {
	COMPLETED: "completed",
	IN_PROGRESS: "in-progress",
} as const;

const DELETE_STRATEGY = "CASCADE";

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TableName.SECTION_STATUSES, (table) => {
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
			.integer(ColumnName.COURSE_SECTION_ID)
			.references(ColumnName.ID)
			.inTable(TableName.COURSE_SECTIONS)
			.onDelete(DELETE_STRATEGY)
			.notNullable();
		table
			.integer(ColumnName.USER_ID)
			.references(ColumnName.ID)
			.inTable(TableName.USERS)
			.notNullable()
			.onDelete(DELETE_STRATEGY);
		table.unique([ColumnName.COURSE_SECTION_ID, ColumnName.USER_ID]);
		table
			.enum(ColumnName.STATUS, Object.values(StatusValue))
			.notNullable()
			.defaultTo(StatusValue.IN_PROGRESS);
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TableName.SECTION_STATUSES);
}

export { down, up };

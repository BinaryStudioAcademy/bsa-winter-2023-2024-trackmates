import { type Knex } from "knex";

const TableName = {
	COURSE_SECTIONS: "course_sections",
} as const;

const ColumnName = {
	DESCRIPTION: "description",
} as const;

function up(knex: Knex): Promise<void> {
	return knex.schema.table(TableName.COURSE_SECTIONS, (table) => {
		table.dropColumn(ColumnName.DESCRIPTION);
	});
}

function down(knex: Knex): Promise<void> {
	return knex.schema.table(TableName.COURSE_SECTIONS, (table) => {
		table.text(ColumnName.DESCRIPTION);
	});
}

export { down, up };

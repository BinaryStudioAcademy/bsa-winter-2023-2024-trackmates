import { TableColumnAlign } from "~/libs/components/table/libs/enums/enums.js";

import { CoursesTableHeader } from "../enums/courses-table-header.enum.js";

const coursesTableColumnToColumnAlign = {
	[CoursesTableHeader.ACTIONS]: TableColumnAlign.CENTER,
	[CoursesTableHeader.DESCRIPTION]: TableColumnAlign.START,
	[CoursesTableHeader.ID]: TableColumnAlign.CENTER,
	[CoursesTableHeader.TITLE]: TableColumnAlign.START,
	[CoursesTableHeader.VENDOR]: TableColumnAlign.CENTER,
} as const;

export { coursesTableColumnToColumnAlign };

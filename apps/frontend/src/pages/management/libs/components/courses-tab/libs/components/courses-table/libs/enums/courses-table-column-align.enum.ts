import { TableColumnAlign } from "~/libs/components/table/libs/enums/enums.js";

import { CoursesTableHeader } from "./courses-table-header.enum.js";

const CoursesTableColumnAlign = {
	[CoursesTableHeader.ACTIONS]: TableColumnAlign.CENTER,
	[CoursesTableHeader.DESCRIPTION]: TableColumnAlign.START,
	[CoursesTableHeader.ID]: TableColumnAlign.CENTER,
	[CoursesTableHeader.TITLE]: TableColumnAlign.START,
	[CoursesTableHeader.VENDOR]: TableColumnAlign.CENTER,
} as const;

export { CoursesTableColumnAlign };

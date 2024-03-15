import { CoursesTableHeader } from "../enums/enums.js";

const coursesHeaderToColumnName = {
	[CoursesTableHeader.BUTTONS]: "buttons",
	[CoursesTableHeader.DESCRIPTION]: "description",
	[CoursesTableHeader.ID]: "id",
	[CoursesTableHeader.TITLE]: "title",
	[CoursesTableHeader.VENDOR]: "vendor",
} as const;

export { coursesHeaderToColumnName };

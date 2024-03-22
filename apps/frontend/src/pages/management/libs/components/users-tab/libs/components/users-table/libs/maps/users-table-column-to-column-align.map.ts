import { TableColumnAlign } from "~/libs/components/table/libs/enums/enums.js";

import { UsersTableHeader } from "../enums/users-table-header.enum.js";

const usersTableColumnToColumnAlign = {
	[UsersTableHeader.ACTIONS]: TableColumnAlign.CENTER,
	[UsersTableHeader.EMAIL]: TableColumnAlign.START,
	[UsersTableHeader.FIRST_NAME]: TableColumnAlign.START,
	[UsersTableHeader.GROUPS]: TableColumnAlign.START,
	[UsersTableHeader.ID]: TableColumnAlign.CENTER,
	[UsersTableHeader.LAST_NAME]: TableColumnAlign.START,
} as const;

export { usersTableColumnToColumnAlign };

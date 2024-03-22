import { TableColumnAlign } from "~/libs/components/table/libs/enums/enums.js";

import { GroupsTableHeader } from "../enums/groups-table-header.enum.js";

const groupsTableColumnToColumnAlign = {
	[GroupsTableHeader.ACTIONS]: TableColumnAlign.CENTER,
	[GroupsTableHeader.ID]: TableColumnAlign.CENTER,
	[GroupsTableHeader.NAME]: TableColumnAlign.START,
	[GroupsTableHeader.PERMISSIONS]: TableColumnAlign.START,
} as const;

export { groupsTableColumnToColumnAlign };

import { TableColumnAlign } from "~/libs/components/table/libs/enums/enums.js";

import { GroupsTableHeader } from "./groups-table-header.enum.js";

const GroupTableColumnAlign = {
	[GroupsTableHeader.ACTIONS]: TableColumnAlign.CENTER,
	[GroupsTableHeader.ID]: TableColumnAlign.CENTER,
	[GroupsTableHeader.NAME]: TableColumnAlign.START,
	[GroupsTableHeader.PERMISSIONS]: TableColumnAlign.START,
} as const;

export { GroupTableColumnAlign };

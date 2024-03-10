import { GroupsTableHeader } from "../enums/enums.js";

const groupsHeaderToColumnName = {
	[GroupsTableHeader.DELETE]: "delete",
	[GroupsTableHeader.EDIT]: "edit",
	[GroupsTableHeader.ID]: "id",
	[GroupsTableHeader.NAME]: "name",
	[GroupsTableHeader.PERMISSIONS]: "permissions",
} as const;

export { groupsHeaderToColumnName };

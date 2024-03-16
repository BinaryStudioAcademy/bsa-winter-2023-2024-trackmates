import { GroupsTableHeader } from "../enums/enums.js";

const groupsHeaderToPropertyName = {
	[GroupsTableHeader.BUTTONS]: "buttons",
	[GroupsTableHeader.ID]: "id",
	[GroupsTableHeader.NAME]: "name",
	[GroupsTableHeader.PERMISSIONS]: "permissions",
} as const;

export { groupsHeaderToPropertyName };

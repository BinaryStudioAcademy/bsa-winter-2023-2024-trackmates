import { UsersTableHeader } from "../enums/enums.js";

const usersHeaderToColumnName = {
	[UsersTableHeader.DELETE]: "delete",
	[UsersTableHeader.EDIT]: "edit",
	[UsersTableHeader.EMAIL]: "email",
	[UsersTableHeader.FIRST_NAME]: "firstName",
	[UsersTableHeader.GROUPS]: "groups",
	[UsersTableHeader.ID]: "id",
	[UsersTableHeader.LAST_NAME]: "lastName",
} as const;

export { usersHeaderToColumnName };

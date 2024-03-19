import { UsersTableHeader } from "../enums/enums.js";

const usersHeaderToPropertyName = {
	[UsersTableHeader.ACTIONS]: "actions",
	[UsersTableHeader.EMAIL]: "email",
	[UsersTableHeader.FIRST_NAME]: "firstName",
	[UsersTableHeader.GROUPS]: "groups",
	[UsersTableHeader.ID]: "id",
	[UsersTableHeader.LAST_NAME]: "lastName",
} as const;

export { usersHeaderToPropertyName };

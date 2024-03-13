import { AppRoute, PermissionKey, PermissionMode } from "~/libs/enums/enums.js";

const LINKS = [
	{
		permissions: {
			mode: PermissionMode.ONE_OF,
			permissions: [PermissionKey.MANAGE_UAM, PermissionKey.MANAGE_USERS],
		},
		title: "Users",
		to: AppRoute.MANAGEMENT_USERS,
	},
	{
		permissions: {
			mode: PermissionMode.ALL_OF,
			permissions: [PermissionKey.MANAGE_UAM],
		},
		title: "Groups",
		to: AppRoute.MANAGEMENT_GROUPS,
	},
];

export { LINKS };

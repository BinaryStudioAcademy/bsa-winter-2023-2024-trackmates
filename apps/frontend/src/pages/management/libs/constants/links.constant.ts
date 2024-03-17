import { AppRoute, PermissionKey, PermissionMode } from "~/libs/enums/enums.js";

const LINKS = [
	{
		permissions: {
			key: [PermissionKey.MANAGE_UAM, PermissionKey.MANAGE_USERS],
			mode: PermissionMode.ONE_OF,
		},
		title: "Users",
		to: AppRoute.MANAGEMENT_USERS,
	},
	{
		permissions: {
			key: [PermissionKey.MANAGE_UAM],
			mode: PermissionMode.ALL_OF,
		},
		title: "Groups",
		to: AppRoute.MANAGEMENT_GROUPS,
	},
];

export { LINKS };

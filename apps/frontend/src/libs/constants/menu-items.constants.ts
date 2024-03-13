import { AppRoute, PermissionKey, PermissionMode } from "~/libs/enums/enums.js";

import { type MenuItem } from "../types/types.js";

const MENU_ITEMS: MenuItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "home",
		label: "Overview",
	},
	{
		href: AppRoute.FEED,
		icon: "activities",
		label: "Activities",
	},
	{
		href: AppRoute.FRIENDS,
		icon: "pie",
		label: "Friends",
	},
	{
		href: AppRoute.MANAGEMENT,
		icon: "lock",
		label: "Management",
		pagePermissions: {
			mode: PermissionMode.ONE_OF,
			permissions: [PermissionKey.MANAGE_UAM, PermissionKey.MANAGE_USERS],
		},
	},
];

export { MENU_ITEMS };

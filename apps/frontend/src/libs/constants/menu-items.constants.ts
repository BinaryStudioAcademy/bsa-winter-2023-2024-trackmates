import { AppRoute } from "~/libs/enums/enums.js";

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
];

export { MENU_ITEMS };

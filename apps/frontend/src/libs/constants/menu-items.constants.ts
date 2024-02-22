import { AppRoute } from "~/libs/enums/enums.js";

import { type MenuItem } from "../types/types.js";

const MENU_ITEMS: MenuItem[] = [
	{
		href: AppRoute.ROOT,
		icon: "home",
		label: "Overview",
	},
];

export { MENU_ITEMS };

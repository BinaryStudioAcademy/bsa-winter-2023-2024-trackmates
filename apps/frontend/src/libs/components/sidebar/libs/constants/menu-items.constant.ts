import { AppRoute } from "~/libs/enums/enums.js";
import { type IconName, type ValueOf } from "~/libs/types/types.js";

const MENU_ITEMS: {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
}[] = [
	{
		href: "/overview",
		icon: "home",
		label: "Overview",
	},
];

export { MENU_ITEMS };

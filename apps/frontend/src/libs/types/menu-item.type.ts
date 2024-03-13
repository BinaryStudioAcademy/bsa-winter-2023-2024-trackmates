import { type AppRoute } from "~/libs/enums/enums.js";

import { type IconName } from "./icon-name.type.js";
import { type PagePermissions } from "./page-permissions.type.js";
import { type ValueOf } from "./value-of.type.js";

type MenuItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
	pagePermissions?: PagePermissions;
};

export { type MenuItem };

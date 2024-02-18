import { AppRoute } from "~/libs/enums/enums.js";

import { type IconName } from "./icon-name.type.js";
import { type ValueOf } from "./value-of.type.js";

type MenuItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

export { type MenuItem };

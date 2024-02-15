import { AppRoute } from "~/libs/enums/enums.js";

import { IconName } from "./icon-name.type.js";
import { ValueOf } from "./value-of.type.js";

type MenuItem = {
	href: ValueOf<typeof AppRoute>;
	icon: IconName;
	label: string;
};

export { type MenuItem };

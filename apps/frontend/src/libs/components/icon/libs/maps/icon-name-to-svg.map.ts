import AddIcon from "~/assets/img/svg/add.svg?react";
import PlusIcon from "~/assets/img/svg/plus.svg?react";

import { type IconName } from "../types/icon-name.type.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	add: AddIcon,
	plus: PlusIcon,
};

export { iconNameToSvg };

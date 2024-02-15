import HomeIcon from "~/assets/img/svg/home.svg?react";
import PlusIcon from "~/assets/img/svg/plus.svg?react";

import { type IconName } from "../types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	home: HomeIcon,
	plus: PlusIcon,
};

export { iconNameToSvg };

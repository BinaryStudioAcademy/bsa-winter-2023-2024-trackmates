import PlusIcon from "~/assets/img/svg/plus.svg?react";

import { type IconName } from "../types/icon-name.type.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	plus: PlusIcon,
};

export { iconNameToSvg };

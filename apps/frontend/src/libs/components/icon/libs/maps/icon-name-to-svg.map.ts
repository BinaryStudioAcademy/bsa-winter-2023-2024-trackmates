import AddIcon from "~/assets/img/svg/add.svg?react";

import { IconName } from "../types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	add: AddIcon,
};

export { iconNameToSvg };

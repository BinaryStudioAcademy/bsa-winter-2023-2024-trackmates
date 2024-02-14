import HomeIcon from "~/assets/img/svg/home.svg?react";

import { IconName } from "../types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	home: HomeIcon,
};

export { iconNameToSvg };

import PlusIcon from "~/assets/img/svg/plus.svg?react";

import { IconName } from "./libs/enums/enums.js";

const iconNameToSvg: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
	[IconName.PLUS]: PlusIcon,
};

export { iconNameToSvg };

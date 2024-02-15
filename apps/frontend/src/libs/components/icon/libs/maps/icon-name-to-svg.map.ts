import EyeIcon from "~/assets/img/svg/eye.svg?react";
import EyeOffIcon from "~/assets/img/svg/eye-off.svg?react";
import PlusIcon from "~/assets/img/svg/plus.svg?react";

import { type IconName } from "../types/icon-name.type.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	eye: EyeIcon,
	eyeOff: EyeOffIcon,
	plus: PlusIcon,
};

export { iconNameToSvg };

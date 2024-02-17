import CrossIcon from "~/assets/img/svg/cross-mark.svg?react";
import HomeIcon from "~/assets/img/svg/home.svg?react";
import PlusIcon from "~/assets/img/svg/plus.svg?react";
import PlusOutlinedIcon from "~/assets/img/svg/plus-outlined.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	cross: CrossIcon,
	home: HomeIcon,
	plus: PlusIcon,
	plusOutlined: PlusOutlinedIcon,
};

export { iconNameToSvg };

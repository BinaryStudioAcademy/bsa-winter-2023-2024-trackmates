import AddIcon from "~/assets/img/svg/add.svg?react";
import HomeIcon from "~/assets/img/svg/home.svg?react";
import PlusIcon from "~/assets/img/svg/plus.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	add: AddIcon,
	home: HomeIcon,
	plus: PlusIcon,
};

export { iconNameToSvg };

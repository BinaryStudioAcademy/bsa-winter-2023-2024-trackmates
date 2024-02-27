import AddIcon from "~/assets/img/svg/add.svg?react";
import BackIcon from "~/assets/img/svg/back.svg?react";
import BurgerIcon from "~/assets/img/svg/burger.svg?react";
import CrossIcon from "~/assets/img/svg/cross.svg?react";
import EyeIcon from "~/assets/img/svg/eye.svg?react";
import EyeOffIcon from "~/assets/img/svg/eye-off.svg?react";
import HomeIcon from "~/assets/img/svg/home.svg?react";
import LogOutIcon from "~/assets/img/svg/log-out.svg?react";
import PieIcon from "~/assets/img/svg/pie.svg?react";
import PlusIcon from "~/assets/img/svg/plus.svg?react";
import PlusOutlinedIcon from "~/assets/img/svg/plus-outlined.svg?react";
import SearchIcon from "~/assets/img/svg/search.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	add: AddIcon,
	back: BackIcon,
	burger: BurgerIcon,
	cross: CrossIcon,
	eye: EyeIcon,
	eyeOff: EyeOffIcon,
	home: HomeIcon,
	logOut: LogOutIcon,
	pie: PieIcon,
	plus: PlusIcon,
	plusOutlined: PlusOutlinedIcon,
	search: SearchIcon,
};

export { iconNameToSvg };

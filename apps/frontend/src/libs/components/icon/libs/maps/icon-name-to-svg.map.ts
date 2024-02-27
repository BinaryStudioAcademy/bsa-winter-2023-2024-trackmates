import AddIcon from "~/assets/img/svg/add.svg?react";
import ArrowLeft from "~/assets/img/svg/arrow-left.svg?react";
import BurgerIcon from "~/assets/img/svg/burger.svg?react";
import Chats from "~/assets/img/svg/chats.svg?react";
import CrossIcon from "~/assets/img/svg/cross.svg?react";
import EyeIcon from "~/assets/img/svg/eye.svg?react";
import EyeOffIcon from "~/assets/img/svg/eye-off.svg?react";
import HomeIcon from "~/assets/img/svg/home.svg?react";
import LogOutIcon from "~/assets/img/svg/log-out.svg?react";
import Message from "~/assets/img/svg/message.svg?react";
import PieIcon from "~/assets/img/svg/pie.svg?react";
import PlusIcon from "~/assets/img/svg/plus.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	add: AddIcon,
	arrowLeft: ArrowLeft,
	burger: BurgerIcon,
	chats: Chats,
	cross: CrossIcon,
	eye: EyeIcon,
	eyeOff: EyeOffIcon,
	home: HomeIcon,
	logOut: LogOutIcon,
	message: Message,
	pie: PieIcon,
	plus: PlusIcon,
};

export { iconNameToSvg };

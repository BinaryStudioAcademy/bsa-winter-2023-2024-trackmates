import AddIcon from "~/assets/icons/add.svg?react";
import BackIcon from "~/assets/icons/back.svg?react";
import BackArrowIcon from "~/assets/icons/back-arrow.svg?react";
import BurgerIcon from "~/assets/icons/burger.svg?react";
import ChatsIcon from "~/assets/icons/chats.svg?react";
import CrossIcon from "~/assets/icons/cross.svg?react";
import EyeIcon from "~/assets/icons/eye.svg?react";
import EyeOffIcon from "~/assets/icons/eye-off.svg?react";
import HomeIcon from "~/assets/icons/home.svg?react";
import InvertedPlus from "~/assets/icons/inverted-plus.svg?react";
import LogOutIcon from "~/assets/icons/log-out.svg?react";
import MessageIcon from "~/assets/icons/message.svg?react";
import PieIcon from "~/assets/icons/pie.svg?react";
import PlusIcon from "~/assets/icons/plus.svg?react";
import PlusOutlinedIcon from "~/assets/icons/plus-outlined.svg?react";
import SearchIcon from "~/assets/icons/search.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	add: AddIcon,
	back: BackIcon,
	backArrow: BackArrowIcon,
	burger: BurgerIcon,
	chats: ChatsIcon,
	cross: CrossIcon,
	eye: EyeIcon,
	eyeOff: EyeOffIcon,
	home: HomeIcon,
	invertedPlus: InvertedPlus,
	logOut: LogOutIcon,
	message: MessageIcon,
	pie: PieIcon,
	plus: PlusIcon,
	plusOutlined: PlusOutlinedIcon,
	search: SearchIcon,
};

export { iconNameToSvg };

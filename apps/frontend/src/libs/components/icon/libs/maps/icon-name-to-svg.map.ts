import ActivitiesIcon from "~/assets/icons/activities.svg?react";
import AddIcon from "~/assets/icons/add.svg?react";
import BackIcon from "~/assets/icons/back.svg?react";
import BackArrowIcon from "~/assets/icons/back-arrow.svg?react";
import BurgerIcon from "~/assets/icons/burger.svg?react";
import ChatsIcon from "~/assets/icons/chats.svg?react";
import CommentIcon from "~/assets/icons/comment.svg?react";
import CrossIcon from "~/assets/icons/cross.svg?react";
import DeleteIcon from "~/assets/icons/delete.svg?react";
import EditIcon from "~/assets/icons/edit.svg?react";
import EyeIcon from "~/assets/icons/eye.svg?react";
import EyeOffIcon from "~/assets/icons/eye-off.svg?react";
import HomeIcon from "~/assets/icons/home.svg?react";
import LikeIcon from "~/assets/icons/like.svg?react";
import LockIcon from "~/assets/icons/lock.svg?react";
import LogOutIcon from "~/assets/icons/log-out.svg?react";
import MessageIcon from "~/assets/icons/message.svg?react";
import NavFirst from "~/assets/icons/nav-first.svg?react";
import NavLast from "~/assets/icons/nav-last.svg?react";
import NavNext from "~/assets/icons/nav-next.svg?react";
import NavPrev from "~/assets/icons/nav-prev.svg?react";
import NotificationIcon from "~/assets/icons/notification.svg?react";
import PieIcon from "~/assets/icons/pie.svg?react";
import PlusIcon from "~/assets/icons/plus.svg?react";
import PlusOutlinedIcon from "~/assets/icons/plus-outlined.svg?react";
import SearchIcon from "~/assets/icons/search.svg?react";
import { type IconName } from "~/libs/types/types.js";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	activities: ActivitiesIcon,
	add: AddIcon,
	back: BackIcon,
	backArrow: BackArrowIcon,
	burger: BurgerIcon,
	chats: ChatsIcon,
	comment: CommentIcon,
	cross: CrossIcon,
	delete: DeleteIcon,
	edit: EditIcon,
	eye: EyeIcon,
	eyeOff: EyeOffIcon,
	home: HomeIcon,
	like: LikeIcon,
	lock: LockIcon,
	logOut: LogOutIcon,
	message: MessageIcon,
	navFirst: NavFirst,
	navLast: NavLast,
	navNext: NavNext,
	navPrev: NavPrev,
	notification: NotificationIcon,
	pie: PieIcon,
	plus: PlusIcon,
	plusOutlined: PlusOutlinedIcon,
	search: SearchIcon,
};

export { iconNameToSvg };

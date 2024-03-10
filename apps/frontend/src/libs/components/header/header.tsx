import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image, Link } from "~/libs/components/components.js";
import {
	EMPTY_ARRAY_LENGTH,
	PAGES_WITH_SEARCH_BAR,
} from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	checkIfPathMatchingPattern,
	getUnreadDisplayValue,
} from "~/libs/helpers/helpers.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { SearchBar } from "../search-bar/search-bar.js";
import {
	EMPTY_UNREAD_COUNT,
	MAXIMUM_DISPLAY_UNREAD_COUNT,
} from "./libs/constants.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const { chats, hasUnreadNotifications, notifications, user } = useAppSelector(
		({ auth, chats, userNotifications }) => {
			return {
				chats: chats.chats,
				hasUnreadNotifications: userNotifications.hasUnreadNotifications,
				notifications: userNotifications.notifications,
				user: auth.user as UserAuthResponseDto,
			};
		},
	);

	const { pathname } = useLocation();

	const isSearchBarShown = PAGES_WITH_SEARCH_BAR.some((template) => {
		return checkIfPathMatchingPattern(pathname, template);
	});

	const unreadChatsCount = chats.reduce((total, chat) => {
		return total + Number(chat.unreadMessageCount);
	}, EMPTY_UNREAD_COUNT);

	const unreadChatsDisplay = getUnreadDisplayValue(
		unreadChatsCount,
		MAXIMUM_DISPLAY_UNREAD_COUNT,
	);

	const hasUnreadChats = unreadChatsCount > EMPTY_ARRAY_LENGTH;

	const unreadNotificationsCount = notifications.filter(
		(notification) => notification.status === "unread",
	).length;

	const unreadNotificationsDisplay = getUnreadDisplayValue(
		unreadNotificationsCount,
		MAXIMUM_DISPLAY_UNREAD_COUNT,
	);

	return (
		<header className={styles["header"]}>
			<div className={styles["toolbar"]}>
				{isSearchBarShown && (
					<SearchBar
						className={styles["search-bar"]}
						inputClassName={styles["search-bar-input"]}
					/>
				)}
				<nav className={styles["navigation"]}>
					<div className={styles["icon-container"]}>
						<Button
							className={styles["icon-button"]}
							hasVisuallyHiddenLabel
							href={AppRoute.CHATS}
							iconName="chats"
							label="To chats"
						/>
						{hasUnreadChats && (
							<span className={styles["counter"]}>{unreadChatsDisplay}</span>
						)}
					</div>
					<div className={styles["icon-container"]}>
						<Button
							className={styles["icon-button"]}
							hasVisuallyHiddenLabel
							href={AppRoute.NOTIFICATIONS}
							iconName="notification"
							label="Notifications"
						/>{" "}
						{hasUnreadNotifications && (
							<span className={styles["counter"]}>
								{unreadNotificationsDisplay}
							</span>
						)}
					</div>
					<Link to={AppRoute.PROFILE}>
						<Image
							alt="user-avatar"
							className={styles["image"]}
							height="48"
							shape="circle"
							src={user.avatarUrl ?? defaultAvatar}
							width="48"
						/>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export { Header };

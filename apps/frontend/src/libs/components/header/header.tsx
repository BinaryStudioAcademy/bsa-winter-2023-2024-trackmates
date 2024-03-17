import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Icon, Image, Link } from "~/libs/components/components.js";
import {
	EMPTY_LENGTH,
	PAGES_WITH_SEARCH_BAR,
} from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	checkIfPathMatchingPattern,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { SearchBar } from "../search-bar/search-bar.js";
import { MAXIMUM_DISPLAY_UNREAD_COUNT } from "./libs/constants/constants.js";
import { getUnreadDisplayValue } from "./libs/helpers/helpers.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const { unreadMessagesCount, unreadNotificationsCount, user } =
		useAppSelector(({ auth, chats, userNotifications }) => {
			return {
				unreadMessagesCount: chats.unreadMessagesCount,
				unreadNotificationsCount: userNotifications.unreadNotificationsCount,
				user: auth.user as UserAuthResponseDto,
			};
		});

	const { pathname } = useLocation();

	const isSearchBarShown = PAGES_WITH_SEARCH_BAR.some((template) => {
		return checkIfPathMatchingPattern(pathname, template);
	});

	const unreadMessagesDisplay = getUnreadDisplayValue(
		unreadMessagesCount,
		MAXIMUM_DISPLAY_UNREAD_COUNT,
	);

	const unreadNotificationsDisplay = getUnreadDisplayValue(
		unreadNotificationsCount,
		MAXIMUM_DISPLAY_UNREAD_COUNT,
	);

	const hasUnreadMessages = unreadMessagesCount > EMPTY_LENGTH;
	const hasUnreadNotifications = unreadNotificationsCount > EMPTY_LENGTH;
	const hasSubscription = Boolean(user.subscription);

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
						{hasUnreadMessages && (
							<span className={styles["counter"]}>{unreadMessagesDisplay}</span>
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
					<Link className={styles["avatar"]} to={AppRoute.PROFILE}>
						<Image
							alt="user-avatar"
							className={getValidClassNames(
								styles["image"],
								hasSubscription && styles["premium"],
							)}
							height="48"
							shape="circle"
							src={user.avatarUrl ?? defaultAvatar}
							width="48"
						/>
						{hasSubscription && (
							<Icon className={styles["premium-icon"]} name="crown" />
						)}
					</Link>
				</nav>
			</div>
		</header>
	);
};

export { Header };

import defaultAvatar from "~/assets/img/default-avatar.png";
import { Button, Image, Link } from "~/libs/components/components.js";
import { PAGES_WITH_SEARCH_BAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import {
	checkIfPathMatchingPattern,
	getValidClassNames,
} from "~/libs/helpers/helpers.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { SearchBar } from "../search-bar/search-bar.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const { hasUnreadNotifications, user } = useAppSelector(({ auth }) => {
		return {
			hasUnreadNotifications: auth.hasUnreadNotifications,
			user: auth.user as UserAuthResponseDto,
		};
	});

	const { pathname } = useLocation();

	const isSearchBarShown = PAGES_WITH_SEARCH_BAR.some((template) => {
		return checkIfPathMatchingPattern(pathname, template);
	});

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
					<Button
						className={styles["icon-button"]}
						hasVisuallyHiddenLabel
						href={AppRoute.CHATS}
						iconName="chats"
						label="To chats"
					/>
					<Button
						className={getValidClassNames(
							styles["icon-button"],
							hasUnreadNotifications && styles["unread"],
						)}
						hasVisuallyHiddenLabel
						href={AppRoute.NOTIFICATIONS}
						iconName="notification"
						label="Notifications"
					/>
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

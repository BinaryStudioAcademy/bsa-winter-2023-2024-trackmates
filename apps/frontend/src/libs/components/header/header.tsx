import { Link } from "~/libs/components/components.js";
import {
	DEFAULT_USER_AVATAR,
	PAGES_WITH_SEARCH_BAR,
} from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { checkIfPathMatchingPattern } from "~/libs/helpers/helpers.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Button } from "../button/button.js";
import { Image } from "../image/image.js";
import { SearchBar } from "../search-bar/search-bar.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const { pathname } = useLocation();

	const user = useAppSelector(({ auth }) => {
		return auth.user as UserAuthResponseDto;
	});

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
					<Link to={AppRoute.PROFILE}>
						<Image
							alt="user-avatar"
							className={styles["image"]}
							height="48"
							shape="circle"
							src={user.avatarUrl ?? DEFAULT_USER_AVATAR}
							width="48"
						/>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export { Header };

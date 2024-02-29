import { Button, Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Image } from "../image/image.js";
import { SearchBar } from "../search-bar/search-bar.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const user = useAppSelector(({ auth }) => {
		return auth.user as UserAuthResponseDto;
	});

	return (
		<header className={styles["header"]}>
			<div className={styles["toolbar"]}>
				<SearchBar />

				<nav>
					<ul className={styles["navbar"]}>
						<li>
							<Button
								className={getValidClassNames(
									styles["navbar-button"],
									user.hasUnreadNotifications ? styles["unread"] : "",
								)}
								href={AppRoute.NOTIFICATIONS}
								iconName="notificationBell"
								label=""
							/>
						</li>
						<li>
							<Link to={AppRoute.PROFILE}>
								<Image
									alt="user-avatar"
									height="48"
									shape="circle"
									src={user.avatarUrl ?? DEFAULT_USER_AVATAR}
									width="48"
								/>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export { Header };

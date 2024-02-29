import { Link } from "~/libs/components/components.js";
import {
	DEFAULT_USER_AVATAR,
	PAGES_WITHOUT_SEARCH_BAR,
} from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector, useLocation } from "~/libs/hooks/hooks.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Image } from "../image/image.js";
import { SearchBar } from "../search-bar/search-bar.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const { pathname } = useLocation();

	const user = useAppSelector(({ auth }) => {
		return auth.user as UserAuthResponseDto;
	});

	const isSearchBarShown = !PAGES_WITHOUT_SEARCH_BAR.includes(
		pathname as ValueOf<typeof AppRoute>,
	);

	return (
		<header className={styles["header"]}>
			<div className={styles["toolbar"]}>
				{isSearchBarShown && (
					<SearchBar
						classNames={styles["search-bar"]}
						inputClassNames={styles["search-bar-input"]}
					/>
				)}

				<Link className={styles["avatar"]} to={AppRoute.PROFILE}>
					<Image
						alt="user-avatar"
						height="48"
						shape="circle"
						src={user.avatarUrl ?? DEFAULT_USER_AVATAR}
						width="48"
					/>
				</Link>
			</div>
		</header>
	);
};

export { Header };

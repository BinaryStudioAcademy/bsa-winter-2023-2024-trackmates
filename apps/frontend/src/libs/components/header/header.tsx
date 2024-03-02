import defaultAvatar from "~/assets/img/default-avatar.png";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Button } from "../button/button.js";
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

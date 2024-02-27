import { Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Button } from "../button/button.js";
import { Image } from "../image/image.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	const user = useAppSelector(({ auth }) => {
		return auth.user as UserAuthResponseDto;
	});

	return (
		<header className={styles["header"]}>
			<div className={styles["toolbar"]}>
				<Button
					className={styles["icon-button"]}
					color="transparent"
					hasVisuallyHiddenLabel
					href={AppRoute.CHATS}
					iconName="chats"
					label="To chats"
					style="outlined"
				/>
				<Link to={AppRoute.PROFILE}>
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

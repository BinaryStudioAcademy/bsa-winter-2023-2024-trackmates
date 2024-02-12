import { AppRoute } from "~/libs/enums/enums.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { Button } from "../button/button.js";
import { Image } from "../image/image.js";
import styles from "./styles.module.css";

const DEFAULT_USER_AVATAR =
	"https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png";

type Properties = {
	user: UserAuthResponseDto | null;
};

const Header: React.FC<Properties> = ({ user }: Properties) => {
	const hasUser = Boolean(user);

	return (
		<header className={styles["header"]}>
			{hasUser ? (
				<div className={styles["toolbar"]}>
					<Image
						alt="user-avatar"
						height="48"
						shape="circle"
						src={DEFAULT_USER_AVATAR}
						width="48"
					/>
				</div>
			) : (
				<Button
					color="primary"
					href={AppRoute.SIGN_IN}
					label="Sign in"
					size="small"
				/>
			)}
		</header>
	);
};

export { Header };

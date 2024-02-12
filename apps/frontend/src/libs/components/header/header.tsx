import { AppRoute } from "~/libs/enums/enums.js";

import { Button } from "../components.js";
import { Image } from "../image/image.js";
import styles from "./styles.module.css";

const DEFAULT_USER_AVATAR =
	"https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png";

type Properties = {
	user: {
		image: {
			url: string;
		} | null;
	} | null;
};

const Header: React.FC<Properties> = ({ user }: Properties) => {
	return (
		<header className={styles["header"]}>
			<div className={styles["header__search"]}>Search input</div>
			{user ? (
				<div className={styles["header__user"]}>
					<Image
						alt="user-avatar"
						height="48"
						shape="circle"
						src={user.image?.url ?? DEFAULT_USER_AVATAR}
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

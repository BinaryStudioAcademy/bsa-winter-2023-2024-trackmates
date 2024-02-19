import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { Link } from "../components.js";
import { Image } from "../image/image.js";
import styles from "./styles.module.css";

const Header = () => {
	const { user } = useAppSelector((state) => ({
		user: state.auth.user,
	}));

	return (
		<header className={styles["header"]}>
			<div className={styles["toolbar"]}>
				<Link className={styles["link"]} to={`/profile/${user?.id}`}>
					<Image
						alt="user-avatar"
						height="48"
						shape="circle"
						src={DEFAULT_USER_AVATAR}
						width="48"
					/>
				</Link>
			</div>
		</header>
	);
};

export { Header };

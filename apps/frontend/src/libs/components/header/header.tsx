import { Link } from "~/libs/components/components.js";
import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";

import { Image } from "../image/image.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
	return (
		<header className={styles["header"]}>
			<div className={styles["toolbar"]}>
				<Link to={AppRoute.PROFILE}>
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

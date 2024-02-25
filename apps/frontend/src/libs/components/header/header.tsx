import { DEFAULT_USER_AVATAR } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";

import { Button } from "../button/button.js";
import { Image } from "../image/image.js";
import styles from "./styles.module.css";

const Header: React.FC = () => {
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
				<Image
					alt="user-avatar"
					height="48"
					shape="circle"
					src={DEFAULT_USER_AVATAR}
					width="48"
				/>
			</div>
		</header>
	);
};

export { Header };

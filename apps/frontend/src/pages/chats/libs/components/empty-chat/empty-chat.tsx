import chatImage from "~/assets/img/chat-character.svg";
import { Image, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

const EmptyChat: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<div className={styles["navigation"]} />
			<div className={styles["content-container"]}>
				<p className={styles["subtitle"]}>
					Go to chat or{" "}
					<Link className={styles["link"]} to={AppRoute.FRIENDS}>
						create new one.
					</Link>
				</p>
				<Image alt="chat image" className={styles["image"]} src={chatImage} />
			</div>
		</div>
	);
};

export { EmptyChat };
